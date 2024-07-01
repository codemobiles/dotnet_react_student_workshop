// export default () => <>Ok</>;

function App() {
  let tmp1 = 0;
  let tmp2: number = 1;
  const tmp3: boolean = false;
  const tmp4: string = "i am lek";

  const random = () => {
    return Math.random();
  };

  return (
    <>
      <Header />
      <br />
      <>Ok V2 {random()}</>;
      <ul>
        <li>{tmp1}</li>
        <li>{tmp2}</li>
        <li>{tmp3 ? "ใช่" : "ไม่"}</li>
        <li>{tmp4}</li>
      </ul>
    </>
  );
}

const Header = () => {
  return <b>Welcome to React</b>;
};

export default App;
