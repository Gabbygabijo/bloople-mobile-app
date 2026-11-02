import Svg, { Path, SvgProps } from "react-native-svg";
const ActiveSavedIcon = (props: SvgProps) => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <Path
      d="M19 6.85714V21L12.5 17.1429L6 21V6.85714C6 5.83416 6.41089 4.85309 7.14228 4.12973C7.87368 3.40638 8.86566 3 9.9 3H15.1C16.1343 3 17.1263 3.40638 17.8577 4.12973C18.5891 4.85309 19 5.83416 19 6.85714Z"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      stroke="#6D3B5E"
    />
  </Svg>
);
export default ActiveSavedIcon;
