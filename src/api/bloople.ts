export type FitDnaDraft = {
  firstName?: string;
  ageRange?: string;
  email?: string;
  phone?: string;
  country?: string;
  height?: string;
  heightUnit?: 'cm' | 'ft/in';
  fitStatus?: string;
  region?: 'UK' | 'US' | 'EU';
  band?: string | null;
  cup?: string | null;
  fitPreference?: string;
  bandProblems?: string[];
  cupProblems?: string[];
  strapsProblems?: string[];
  generalProblems?: string[];
  additionalNotes?: string;
};

export type FitDnaProfile = {
  answers: Record<string, unknown> | null;
  derived: {
    sizeLabel?: string | null;
    tagline?: string;
    fitDescription?: string;
    needsTags?: string[];
    insight?: string | null;
  } | null;
  version: number;
  updatedAt: string | null;
};

export type Account = { id: string; email: string; firstName: string };
export type MatchStatus = { pending: boolean; scoredProducts: number; profileVersion: number | null };
export type SizeOptions = Record<'UK' | 'US' | 'EU', { bands: string[]; cups: string[] }>;

export class ApiError extends Error {
  constructor(message: string, readonly status: number) {
    super(message);
    this.name = 'ApiError';
  }
}

const apiBaseUrl = (process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:8010').replace(/\/$/, '');

export class BloopleApi {
  constructor(private readonly token: string) {}

  private async request<T>(path: string, init: RequestInit = {}): Promise<T> {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 12_000);
    try {
      const response = await fetch(`${apiBaseUrl}${path}`, {
        ...init,
        signal: controller.signal,
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${this.token}`,
          ...(init.body ? { 'Content-Type': 'application/json' } : {}),
          ...init.headers,
        },
      });
      const body = await response.json().catch(() => null);
      if (!response.ok) {
        const message = body?.error?.message ?? `The local API returned ${response.status}.`;
        throw new ApiError(message, response.status);
      }
      return body as T;
    } catch (error) {
      if (error instanceof ApiError) throw error;
      if (controller.signal.aborted) throw new Error('The local API took too long to respond.');
      throw new Error('Could not reach the local API. Check its address and that Docker is running.');
    } finally {
      clearTimeout(timeout);
    }
  }

  async getAccount() {
    return this.request<Account>('/v1/me');
  }

  async getFitDna() {
    return this.request<FitDnaProfile>('/v1/me/fit-dna');
  }

  async saveFitDna(draft: FitDnaDraft) {
    const body: Record<string, unknown> = {
      firstName: draft.firstName?.trim(),
      ageRange: draft.ageRange,
      email: draft.email?.trim() || undefined,
      phone: draft.phone?.trim() || undefined,
      country: draft.country,
      height: draft.height,
      heightUnit: draft.heightUnit,
      fitStatus: draft.fitStatus,
      fitPreference: draft.fitPreference,
      bandProblems: draft.bandProblems ?? [],
      cups: draft.cupProblems ?? [],
      straps: draft.strapsProblems ?? [],
      general: draft.generalProblems ?? [],
      additionalNotes: draft.additionalNotes?.trim() || undefined,
    };

    if (draft.region && draft.band && draft.cup) {
      body.system = draft.region;
      body.band = draft.band;
      body.cup = draft.cup;
    }

    const saved = await this.request<FitDnaProfile & { matchStatus: string }>('/v1/me/fit-dna', {
      method: 'PUT',
      body: JSON.stringify(body),
    });
    return { ...saved, answers: body };
  }

  async getMatchStatus() {
    return this.request<MatchStatus>('/v1/me/match-status');
  }

  async getSizeOptions() {
    const response = await this.request<{ sizeOptionsBySystem: SizeOptions }>('/v1/lookups');
    return response.sizeOptionsBySystem;
  }
}

export function toFitDnaDraft(profile: FitDnaProfile): FitDnaDraft {
  const answers = profile.answers ?? {};
  return {
    firstName: typeof answers.firstName === 'string' ? answers.firstName : '',
    ageRange: typeof answers.ageRange === 'string' ? answers.ageRange : '',
    email: typeof answers.email === 'string' ? answers.email : '',
    phone: typeof answers.phone === 'string' ? answers.phone : '',
    country: typeof answers.country === 'string' ? answers.country : 'United Kingdom',
    height: typeof answers.height === 'string' ? answers.height : '',
    heightUnit: answers.heightUnit === 'ft/in' ? 'ft/in' : 'cm',
    fitStatus: typeof answers.fitStatus === 'string' ? answers.fitStatus : '',
    region: answers.system === 'UK' || answers.system === 'US' || answers.system === 'EU' ? answers.system : undefined,
    band: typeof answers.band === 'string' ? answers.band : null,
    cup: typeof answers.cup === 'string' ? answers.cup : null,
    fitPreference: typeof answers.fitPreference === 'string' ? answers.fitPreference : '',
    bandProblems: stringArray(answers.bandProblems),
    cupProblems: stringArray(answers.cups),
    strapsProblems: stringArray(answers.straps),
    generalProblems: stringArray(answers.general),
    additionalNotes: typeof answers.additionalNotes === 'string' ? answers.additionalNotes : '',
  };
}

function stringArray(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((entry): entry is string => typeof entry === 'string') : [];
}
