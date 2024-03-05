import { TypeAnimation } from "react-type-animation";

export default function TyperAnimation() {
  return (
    <TypeAnimation
      sequence={[
        "Learn More Efficiently With Parallel",
        2500,
        "Built With OpenAI",
        2500,
        "Pair Programming At Your Own Pace",
        2500,
      ]}
      speed={50}
      style={{
        fontSize: "4rem",
        color: "white",
        display: "inline-block",
        textShadow: "1px 1px 20px #000",
        textAlign: "center"
      }}
      repeat={2}
    />
  );
}
