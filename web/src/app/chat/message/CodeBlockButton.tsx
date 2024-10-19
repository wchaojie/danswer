import { PropsWithChildren, useState } from "react";
import { Stack, Typography } from "@mui/material";
import styled from "@emotion/styled";
import CodeIcon from '@mui/icons-material/Code';
import { useDialog } from "../../../components/context/DialogContext";

// ----------------------------------------------------------------------

export default function CodeBlockButton({children}: PropsWithChildren) {
  const { setShowDialog, setContent } = useDialog()

  const handleShowDialog = () => {
    setShowDialog(true)
    setContent(children)
  }

  return (
      <WrapperButton my={1} direction={"row"} onClick={handleShowDialog}>
        <Stack width={"4rem"} justifyContent={"center"} alignItems={"center"} borderRight={"1px #C6C5BA solid"}>
          <CodeIcon fontSize={"large"} sx={{color: "#615D53"}} />
        </Stack>
        <Stack width={"10rem"} justifyContent={"center"} alignItems={"center"}>
          <Typography color={"textPrimary"}>Click to open code</Typography>
        </Stack>
      </WrapperButton>
  )
}

const WrapperButton = styled(Stack)`
  height: 3rem;
  width: 14rem;
  background-color: #EEEADF;
  border-radius: 6px;
  border: 1px #C6C5BA solid;
  &:hover {
    cursor: pointer;
  }
`
