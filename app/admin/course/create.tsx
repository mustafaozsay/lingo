import {
  Create,
  Datagrid,
  List,
  SimpleForm,
  TextField,
  TextInput,
  required,
} from "react-admin";

export const CourseCreate = () => {
  return (
    <Create>
      <SimpleForm>
        <TextInput source="title" validate={[required()]} label="Title" />
        <TextInput
          source="imageSrc"
          validate={[required()]}
          label="İmage Source"
        />
      </SimpleForm>
    </Create>
  );
};
