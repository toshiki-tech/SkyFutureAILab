// 辅助函数：将简单的文本数组转换为 PortableText 格式

export function createPortableTextBlocks(texts: string[]): any[] {
  return texts.map((text) => ({
    _type: 'block',
    children: [
      {
        _type: 'span',
        text: text,
        marks: [],
      },
    ],
    style: 'normal',
    markDefs: [],
  }))
}

export function createPortableTextWithBold(text: string, boldText?: string): any[] {
  const blocks: any[] = []
  
  if (boldText) {
    blocks.push({
      _type: 'block',
      children: [
        {
          _type: 'span',
          text: boldText,
          marks: ['strong'],
        },
      ],
      style: 'normal',
      markDefs: [],
    })
  }
  
  blocks.push({
    _type: 'block',
    children: [
      {
        _type: 'span',
        text: text,
        marks: [],
      },
    ],
    style: 'normal',
    markDefs: [],
  })
  
  return blocks
}

export function createPortableTextList(items: string[]): any[] {
  return items.map((item) => ({
    _type: 'block',
    children: [
      {
        _type: 'span',
        text: item,
        marks: [],
      },
    ],
    style: 'normal',
    listItem: 'bullet',
    markDefs: [],
  }))
}
