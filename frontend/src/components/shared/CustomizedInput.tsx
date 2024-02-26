import { TextField } from "@mui/material";

type CustomizedInputProps = {
  name: string;
  type: string;
  label: string;
};
export default function CustomizedInput(props: CustomizedInputProps) {
  return (
    <TextField
      margin="normal"
      InputLabelProps={{ style: { color: "white" } }}
      name={props.name}
      type={props.type}
      label={props.type}
      InputProps={{
        style: {
          width: "400px",
          borderRadius: ".75rem",
          fontSize: "1.75rem",
          color: "black",
        },
      }}
    ></TextField>
  );
}
