const Content = ({ children }: { children: React.ReactNode }) => {
  return <div className="grid flex-grow card bg-base-300 rounded-box">{children}</div>
}

export default Content;