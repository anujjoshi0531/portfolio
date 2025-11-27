type NotionExperience = {
    id: string
    properties: {
      Role: { title: { plain_text: string }[] }
      Type: { select: { name: string } | null }
      Organization: { rich_text: { plain_text: string }[] }
      Description: { rich_text: { plain_text: string }[] }
      Start: { date: { start: string } }
      End: { date: { start: string | null } }
      Place: { rich_text: { plain_text: string }[] }
      URL: { url: string | null }
      Certificate: { url: string | null }
      Skills: { multi_select: { name: string }[] }
    }
  }