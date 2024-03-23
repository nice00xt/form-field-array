import './App.css'
import Content from './components/Content'
import Form from './components/Form'
import Overview from './components/Overview'
import { FormValuesProvider } from './components/hooks/useGetValues'

const defaultValues = {
  items: [
    {
      id: "19si3ld54jdn",
      name: "Luigi",
      last_name: "Mario",
    },
    {
      id: "1937y7j3md83",
      name: "Cosme",
      last_name: "Fulanito",
    },
  ],
};

function App() {
  return (
    <FormValuesProvider>
      <div className="flex flex-col w-full lg:flex-row">
        <Content>
          <Form />
        </Content>
        <div className="divider lg:divider-horizontal"></div> 
        <Content>
          <Overview values={defaultValues} />
        </Content>
      </div>
    </FormValuesProvider>
  )
}

export default App
