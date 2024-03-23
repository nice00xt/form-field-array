import { IconInfo } from "../Icons";
import { useFormValues } from "../hooks/useGetValues";
import type { ItemProps, OverviewProps } from "../types";

const Overview = ({ values }: OverviewProps) => {
  const { storedValues } = useFormValues();

  if (!storedValues) return null;

  return (
    <div className='w-full flex flex-col items-center'>
      <h2>Overview</h2>
      <div className="mt-5 text-left w-full lg:max-w-[400px]">
        <pre className='mb-2'><code className='text-white'>Items: [</code></pre>
        {storedValues.map(({ id, name, last_name, _destroy, form_id }: ItemProps, index: number) => {
          return (
            <div key={index} className={`indicator first-letter:after:mb-4 py-4 rounded-lg mx-4 block mb-4 w-auto px-2 transition-all ${_destroy ? "bg-slate-800" : "bg-slate-700"}`}>
              {(id === "" && !_destroy) && <span className="indicator-item badge badge-success right-[35px] mt-[20px] text-white">new</span>}
              <pre><code>{`{`}</code></pre>
              <pre>
                {(id !== "" && !_destroy) ? (
                  <pre className="text-white mb-1 ml-4">
                    <code className='bg-info p-1 px-2 rounded-md inline relative'>
                      id: <span className='text-white'>"{id}"</span>
                      <div className='absolute left-[-26px] top-[4px] cursor-pointer'>
                        <IconInfo />
                      </div>
                    </code>
                  </pre>
                ) : (
                  <code className='text-white ml-4'>id: <span className='text-yellow-400'>"{id}"</span></code>
                )}
              </pre>
              <pre>
                <code className='text-white ml-4'>name: <span className='text-yellow-400'>"{name}"</span></code>
              </pre>
              <pre>
                <code className='text-white ml-4'>last_name: <span className='text-yellow-400'>"{last_name}"</span></code>
              </pre>
              {_destroy && (
                <pre className="text-white mt-2 ml-4">
                  <code className='bg-error py-1 rounded-md px-2'>_destroy: "1"</code>
                </pre> 
              )}
              <br/>
              <pre className="w-[%] truncate"><code className='ml-4'>form_id: "{form_id}"</code></pre>
              <pre><code>{`},`}</code></pre>
              <pre className='mb-4 text-[12px] absolute right-[12px] bottom-[-6px]'>
                <code>index: <span className='text-blue-300'>{index}</span></code>
              </pre>
            </div>
          )
        })}
        <pre className='mb-2'><code className='text-white'>];</code></pre>
      </div>
    </div>
  )
}

export default Overview;