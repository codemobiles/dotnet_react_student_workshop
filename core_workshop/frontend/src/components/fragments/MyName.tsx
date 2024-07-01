type MyNameProps = { title: string; subtitle: string };
export const MyName = (props: MyNameProps) => {
  return (
    <>
      My name is {props.title} {props.subtitle}
    </>
  );
};


