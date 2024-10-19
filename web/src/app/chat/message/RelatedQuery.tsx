import { useEffect, useState } from "react";
import { Box, CircularProgress, Divider, Stack, Typography } from "@mui/material";

import SegmentIcon from '@mui/icons-material/Segment';
import AddIcon from '@mui/icons-material/Add';
import { Message } from "../interfaces";

// ----------------------------------------------------------------------

type RelatedQueryProps = {
  message?: Message
}
export default function RelatedQuery({ message }: RelatedQueryProps) {
  const [loading, setLoading] = useState(true)
  const [newAnswers, setNewAnswers] = useState<string[]>([])
  const [currSelectedQuery, setCurrSelectedQuery] = useState<string>()

  // 初始化
  useEffect(() => {
    if (!message?.message) return

    // TODO: 请求AI接口生成相关问题
    timeSleep().then(() => {
      const answers = new Array(5).fill(message.message)
      setNewAnswers(answers)
      setLoading(false)
    })
  }, [message])

  // 选中关联的请求
  useEffect(() => {
    if (!currSelectedQuery) return

    //TODO: 将问题发送个AI请求
    console.log("--> 请求AI接口问题为：", currSelectedQuery)
  }, [currSelectedQuery])

  if (!message) return

  return (
    <Stack mt={3} width={1} justifyContent={"center"} alignItems={"center"}>
      <Box
        width={{
          lg: "650px",
          md: "650px",
          sm: "80vw",
          xs: "90vw",
        }}
      >
        <Divider />
        <Stack my={2} spacing={1}>
          <Stack direction={"row"} justifyContent={"start"} alignItems={"center"} spacing={2}>
            <SegmentIcon />
            <Typography fontSize={"1.4rem"} fontWeight={600}>Related</Typography>
          </Stack>
            {loading
              ? <Stack width={1} alignItems={"center"}><CircularProgress color={"#217381"} /></Stack>
              : newAnswers.map((val, idx) => (
              <MessageItem key={idx} title={`测试标题：${val} - ${idx}`} onClick={setCurrSelectedQuery} />
            ))}
        </Stack>
      </Box>
    </Stack>
  )
}


type MessageItemProps = {
  title: string
  onClick: (title: string) => void
}
const MessageItem  = ({title, onClick}: MessageItemProps) => {
  return (
    <>
      <Divider />
        <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"} onClick={() => onClick(title) }>
          <Typography
          overflow={"hidden"}
          whiteSpace={"nowrap"}
          textOverflow={"ellipsis"}
          color={"#525252"}
          fontWeight={500}
          fontSize={"1.2rem"}
          sx={{"&:hover": {cursor: "pointer", color: "#217381"}}}
          >
            {title}
          </Typography>
          <AddIcon color={"#217381"} />
        </Stack>
    </>
  )
}

// 休眠
const timeSleep = (time = 1) => {
  return new Promise(resolve => setTimeout(resolve, time * 1000))
}
