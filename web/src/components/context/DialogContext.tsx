import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react"

// ----------------------------------------------------------------------

// 上下文对话框
interface IContext {
  showDialog: boolean
  setShowDialog: Dispatch<SetStateAction<boolean>>
  content: ReactNode
  setContent: Dispatch<SetStateAction<ReactNode>>
}
const Context = createContext<IContext | undefined>(undefined)
Context.displayName = "DialogProvider"

export const DialogProvider = ({ children }: { children: ReactNode }) => {
  const [showDialog, setShowDialog] = useState(false)
  const [content, setContent] = useState<ReactNode>()

  return <Context.Provider value={{ showDialog, setShowDialog, content, setContent }}>{children}</Context.Provider>
}

export const useDialog = () => {
  const context = useContext(Context)
  if (!context) throw new Error("useDialog must be used in DialogProvider!")

  return context
}
