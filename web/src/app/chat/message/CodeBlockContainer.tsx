import React, { forwardRef, ReactElement, Ref } from "react";
import { Box, Dialog as MuiDialog, DialogContent, Slide, Stack, useMediaQuery, useTheme } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { TransitionProps } from "@mui/material/transitions";
import { useDialog } from "../../../components/context/DialogContext";

// ----------------------------------------------------------------------

export default function CodeBlockContainer() {
  const theme = useTheme()
  const greaterThanMid = useMediaQuery(theme.breakpoints.up("md"))
  const { showDialog } = useDialog()

  return (
    <>
      {(greaterThanMid && showDialog) ? <CodeBlockBox/> : <CodeBlockDialog/> }
    </>
  )
}

const CodeBlockBox = () => {
  const { content } = useDialog()

  return (
    <Stack alignItems={"center"} borderRadius={"6px"} border={"1px solid #C6C5BA"}>
      <CodeBlockHeader />
      <Box bgcolor={"#2d2d2d"} border={"1px solid #C6C5BA"} overflow={"hidden"}>{content}</Box>
    </Stack>
  )
}

const CodeBlockDialog = () => {
  const { showDialog, setShowDialog, content } = useDialog()

  return (
    <MuiDialog
      open={showDialog}
      keepMounted
      TransitionComponent={DialogTransition} // 过渡动画
      onClose={() => setShowDialog(false)}
      sx={{
        "& .MuiDialog-paper": {
          maxWidth: "80%",
          minWidth: "60%",
          // maxWidth: isTablet ? "60%" : `calc(${app.maxWidth} - 6rem)`,
          // minWidth: isTablet ? "50%" : `calc(${app.maxWidth} - 10rem)`,
        },
      }}
    >
      <CodeBlockHeader isDialog />
      <DialogContent sx={{paddingTop: 0, backgroundColor: "#2d2d2d"}}>
        {content}
      </DialogContent>
    </MuiDialog>
  )
}

const CodeBlockHeader = ({isDialog}: {isDialog?: boolean}) => {
  const { setShowDialog } = useDialog()

  return (
    <Stack mt={1} mb={0.5} px={1} width={1} direction={"row"} justifyContent={isDialog ? "end" : "space-between"} onClick={() => setShowDialog(false)} >
      {!isDialog && <ArrowBackIcon sx={{"&:hover": {cursor: "pointer"}}} />}
      <CloseIcon sx={{"&:hover": {cursor: "pointer", backgroundColor: "#E0DDCE", borderRadius: "4px"}}} />
    </Stack>
  )
}

// 动画效果
const DialogTransition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement<any, any>
  },
  ref: Ref<unknown>
) {
  return <Slide direction={"up"} ref={ref} {...props} />
})
