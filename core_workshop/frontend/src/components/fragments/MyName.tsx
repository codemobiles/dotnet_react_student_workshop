type MyNameProps = { title: string; subtitle: string };
const MyName = (props: MyNameProps) => {
  return (
    <>
      My name is {props.title} {props.subtitle}
    </>
  );
};
