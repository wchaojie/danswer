import Link from "next/link";
import { useState } from "react";
import Image from "next/image"
import { Fade, Paper, Popper, PopperPlacementType, Stack, Typography } from "@mui/material";

import LogoMeta from "../../../assets/meta-logo.webp"
import LogoMs from "../../../assets/ms-logo.png"
import LogoGoogle from "../../../assets/google-logo.png"

// ----------------------------------------------------------------------

export default function PositionedQuote() {

  const quoteArr: TQuote[] = [
    {num: 1, title: "Meta Platforms维基百科介绍", url: "https://zh.wikipedia.org/wiki/Meta_Platforms", logo: LogoMeta, content: "Meta Platforms, Inc.（商业名称：Meta）是美国一家经营社交网络服务、虚拟现实、元宇宙等产品的互联网科技公司，总部位于美国加州门洛帕克，旗下拥有Facebook、Instagram、WhatsApp等社交软件。它是由马克·扎克伯格和他的室友、哈佛学院的学生爱德华多·萨维林、安德鲁·麦科勒姆、达斯廷·莫斯科维茨和克里斯·休斯一起创立的，最初的名字是TheFacebook.com，后简化为Facebook，后于2021年10月28日由扎克伯格宣布改名为Meta。"},
    {num: 2, title: "Gosogle公司维基百科介绍", url: "https://zh.wikipedia.org/wiki/Google", logo: LogoGoogle, content: "Google（中文译名：谷歌[6][注 2]）是总部位于美国加州山景城的跨国科技公司，为Alphabet（字母控股）的子公司，业务范围涵盖互联网广告、互联网搜索、云计算等领域，开发并提供大量基于互联网的产品与服务[8]，其主要利润来自Ads和AdSense等广告服务[9][10]。Google由在斯坦福大学攻读理工博士的拉里·佩奇和谢尔盖·布林共同创建，因此两人也被称为“Google Guys”"},
    {num: 3, title: "微软公司维基百科介绍", url: "https://zh.wikipedia.org/wiki/%E5%BE%AE%E8%BD%AF", logo: LogoMs, content: "微软（英语：Microsoft）是源自美国的跨国科技公司，于1975年由比尔·盖茨与保罗·艾伦创立，总部位于美国华盛顿州的雷德蒙德，与亚马逊、苹果、谷歌、Meta并行为五大科技巨擘。其中为研发、制造、授权及提供广泛的电脑软件服务为主要业务[1][2]，最为著名且畅销的产品是Microsoft Windows操作系统及Microsoft Office办公软件，其它子公司如Xbox游戏业务等也都十分的著名。"},
  ]

  return (
    <Stack mt={1} direction={"row"} spacing={2}>
      {quoteArr.map((val, idx) => <Quote key={idx} info={val} />)}
    </Stack>
  )
}

type TQuote = {
  num: number
  title: string
  url: string
  logo: string
  content: string
}

const Quote = ({info} : {info: TQuote}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState<PopperPlacementType>();

  // 显示悬浮
  const handleShowPopper = (newPlacement: PopperPlacementType) => (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
      setOpen((prev) => placement !== newPlacement || !prev);
      setPlacement(newPlacement);
    };

  return (
    <>
      <Popper
        sx={{ zIndex: 1200 }}
        open={open}
        anchorEl={anchorEl}
        placement={placement}
        transition
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper sx={{
              width: "350px",
              padding: "10px"
            }}>
              <Stack width={1} p={1} spacing={1}>
                <Stack direction={"row"} justifyContent={"start"} spacing={1}>
                  <Image height={22} src={info.logo} alt={"logo"} />
                  <Typography
                    overflow={"hidden"}
                    whiteSpace={"nowrap"}
                    textOverflow={"ellipsis"}
                    color={"#494945"}
                    width={"80%"}
                  >
                    {info.url}
                  </Typography>
                </Stack>
                <Link target={"_blank"} href={info.url}>
                  <Typography
                    overflow={"hidden"}
                    whiteSpace={"nowrap"}
                    textOverflow={"ellipsis"}
                    color={"#525252"}
                    fontWeight={700}
                    fontSize={"1.4rem"}
                    sx={{"&:hover": {color: "#217381"}}}
                  >
                    {info.title}
                  </Typography>
                </Link>
                <Typography
                  height={"120px"}
                  overflow={"hidden"}
                  textOverflow={"ellipsis"}
                  color={"#738080"}
                >
                  {info.content}
                </Typography>
              </Stack>
            </Paper>
          </Fade>
        )}
      </Popper>
      <Stack
        width={"1.5rem"}
        height={"1.5rem"}
        justifyContent={"center"}
        alignItems={"center"}
        color={"#61625B"}
        bgcolor={"#E3E4DD"}
        borderRadius={"50%"}
        sx={{"&:hover": {cursor: "pointer", backgroundColor: "#70979E", color: "white"}}}
        onClick={handleShowPopper("top")}
      >
        {info.num}
      </Stack>
    </>
  )
}
