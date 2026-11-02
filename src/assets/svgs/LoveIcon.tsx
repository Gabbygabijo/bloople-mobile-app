import Svg, { Path, SvgProps } from "react-native-svg";
const LoveIcon = (props: SvgProps) => (
  <Svg
    width={22}
    height={20}
    viewBox="0 0 22 20"
    fill="none"
    {...props}
  >
    <Path
      d="M6.5 1C3.4625 1 1 3.4625 1 6.5C1 12 7.5 17 11 18.163C14.5 17 21 12 21 6.5C21 3.4625 18.5375 1 15.5 1C13.64 1 11.995 1.9235 11 3.337C10.4928 2.61469 9.81897 2.0252 9.03568 1.61841C8.25238 1.21162 7.38263 0.999502 6.5 1Z"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      stroke="#6D3B5E"
    />
  </Svg>
);
export default LoveIcon;
