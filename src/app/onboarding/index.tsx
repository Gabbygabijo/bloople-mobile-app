import { useRouter } from 'expo-router';
import { useState } from 'react';

import { FitDnaDraft, toFitDnaDraft } from '@/api/bloople';
import { AboutYouStep } from '@/components/onboarding/AboutYouStep';
import { OnboardingLayout } from '@/components/onboarding/OnboardingLayout';
import { YourFitStep1 } from '@/components/onboarding/YourFitStep1';
import { YourFitStep2 } from '@/components/onboarding/YourFitStep2';
import { YourFitStep3 } from '@/components/onboarding/YourFitStep3';
import { useBloopleApi } from '@/state/BloopleApiContext';

const isUncertainAboutSize = (status?: string) => status === "I'm not sure" || status === "I've never been properly fitted";

export default function OnboardingScreen() {
  const router = useRouter();
  const { profile, saveFitDna } = useBloopleApi();
  const [currentStep, setCurrentStep] = useState(1);
  const [onboardingData, setOnboardingData] = useState<FitDnaDraft>(() => profile ? toFitDnaDraft(profile) : {});
  const [isSaving, setIsSaving] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleNextStep = async (stepData: FitDnaDraft) => {
    const nextData = { ...onboardingData, ...stepData };
    setOnboardingData(nextData);
    setSubmitError(null);

    if (currentStep === 1) return setCurrentStep(2);
    if (currentStep === 2) return setCurrentStep(isUncertainAboutSize(nextData.fitStatus) ? 4 : 3);
    if (currentStep === 3) return setCurrentStep(4);

    setIsSaving(true);
    try {
      await saveFitDna(nextData);
      router.replace('/(tabs)');
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Could not save your Fit-DNA. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleBack = () => {
    if (currentStep === 4 && isUncertainAboutSize(onboardingData.fitStatus)) return setCurrentStep(2);
    if (currentStep > 1) return setCurrentStep(currentStep - 1);
    router.back();
  };

  const stepTitle = currentStep === 1 ? 'About You' : `Your fit (${currentStep - 1}/3)`;
  const step = currentStep === 1
    ? <AboutYouStep initialData={onboardingData} onContinue={handleNextStep} />
    : currentStep === 2
      ? <YourFitStep1 initialData={onboardingData} onContinue={handleNextStep} />
      : currentStep === 3
        ? <YourFitStep2 initialData={onboardingData} onContinue={handleNextStep} />
        : <YourFitStep3 initialData={onboardingData} submitError={submitError} isSaving={isSaving} onContinue={handleNextStep} />;

  return <OnboardingLayout currentStep={currentStep} totalSteps={4} stepTitle={stepTitle} onBack={handleBack}>{step}</OnboardingLayout>;
}
