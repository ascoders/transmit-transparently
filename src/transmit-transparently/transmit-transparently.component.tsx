import * as React from "react"
import others from "../others/others"
import { Props, State } from "./transmit-transparently.type"

export default (...ignore: string[]) => (Target: any) => {
  class Transmit extends React.Component<Props, State> {
    public static defaultProps = new Props()
    public state = new State()

    private displayName = "TransmitTransparently"
    private wrappedInstance: React.ReactInstance

    public render(): React.ReactElement<any> {
      const newProps: any = { ...this.props }
      newProps.others = others(Target.defaultProps, newProps, ignore)
      newProps.ref = ((ref: React.ReactInstance) => {
        this.wrappedInstance = ref
      })
      return React.createElement(Target, newProps, this.props.children)
    }
  }

  const func: any = () => {
    return Transmit
  }

  return func()
}
