import './App.css'
import Content from './components/Content'
import Form from './components/Form'
import Overview from './components/Overview'

const defaultValues = {
  items: [
    {
      id: "",
      name: "",
      last_name: "",
      form_id: "00000",
    },
    {
      id: "19si3ld54jdn46w7rh48wu",
      name: "Luigi",
      last_name: "Mario",
      form_id: "11111",
    },
    {
      id: "1937y7j3md83hw04he8w4",
      name: "Wasi",
      last_name: "wason",
      _destroy: "1",
      form_id: "44444",
    },
  ],
};

function App() {
  return (
    <>
      <div className="flex flex-col w-full lg:flex-row">
        <Content>
          <Form />
        </Content>
        <div className="divider lg:divider-horizontal"></div> 
        <Content>
          <Overview values={defaultValues} />
        </Content>
      </div>
    </>
  )
}

export default App
