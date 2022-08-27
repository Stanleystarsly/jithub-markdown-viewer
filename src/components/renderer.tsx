import {
  Content,
  Paragraph,
  Heading,
  ThematicBreak,
  Blockquote,
  List,
  ListItem,
  Table,
  TableRow,
  TableCell,
  HTML,
  Code,
  YAML,
  Definition,
  FootnoteDefinition,
  Text,
  Emphasis,
  Strong,
  Delete,
  InlineCode,
  Break,
  Link,
  Image,
  LinkReference,
  ImageReference,
  Footnote,
  FootnoteReference,
  PhrasingContent,
  PhrasingContentMap,
  StaticPhrasingContent,
  BlockContent,
} from 'mdast';
import {
  Text as TextBlock,
  View,
} from 'react-native';
import { Table as TableComponent, Row, Cell } from 'react-native-table-component';

type Depth = 1|2|3|4|5|6;

export const renderNode = (node: Content): JSX.Element => {
  switch (node.type) {
    case "paragraph":
      const paragraph = node as Paragraph;
      return renderParagraph(paragraph);
    case "heading":
      const heading = node as Heading;
      return renderHeading(heading);
    case "thematicBreak":
      const thematicBreak = node as ThematicBreak;
      return renderThematicBreak(thematicBreak);
    case "blockquote":
      const blockquote = node as Blockquote;
      return renderBlockquote(blockquote);
    case "list":
      const list = node as List;
      return renderList(list);
    case "listItem":
      const listItem = node as ListItem;
      return renderListItem(listItem);
    case "table":
      const table = node as Table;
      return renderTable(table);
    case "tableRow":
      const tableRow = node as TableRow;
      return renderTableRow(tableRow);
    case "tableCell":
      const tableCell = node as TableCell;
      return renderTableCell(tableCell);
    case "code":
      const code = node as Code;
      return renderCode(code);
    case "yaml":
      const yaml = node as YAML;
      return renderYAML(yaml);
    case "definition":
      const definition = node as Definition;
      return renderDefinition(definition);
    case "footnoteDefinition":
      const footnoteDefinition = node as FootnoteDefinition;
      return renderFootnoteDefinition(footnoteDefinition);
    case "text":
    case "emphasis":
    case "strong":
    case "delete":
    case "html":
    case "inlineCode":
    case "break":
    case "link":
    case "image":
    case "linkReference":
    case "imageReference":
    case "footnote":
    case "footnoteReference":
      return renderPhrasingContent(node as PhrasingContentMap[keyof PhrasingContentMap]);
  }
}

export const renderStaticPhrasingContent = (node: StaticPhrasingContent, depth?: Depth): JSX.Element => {
  switch (node.type) {
    case "text":
      const text = node as Text;
      return renderText(text, depth);
    case "emphasis":
      const emphasis = node as Emphasis;
      return renderEmphasis(emphasis, depth);
    case "strong":
      const strong = node as Strong;
      return renderStrong(strong, depth);
    case "delete":
      const deleteNode = node as Delete;
      return renderDelete(deleteNode, depth);
    case "html":
      const html = node as HTML;
      return renderHTML(html, depth);
    case "inlineCode":
      const inlineCode = node as InlineCode;
      return renderInlineCode(inlineCode, depth);
    case "break":
      const breakNode = node as Break;
      return renderBreak(breakNode, depth);
    case "image":
      const image = node as Image;
      return renderImage(image, depth);
    case "imageReference":
      const imageReference = node as ImageReference;
      return renderImageReference(imageReference, depth);
    case "footnote":
      const footnote = node as Footnote;
      return renderFootnote(footnote, depth);
    case "footnoteReference":
      const footnoteReference = node as FootnoteReference;
      return renderFootnoteReference(footnoteReference, depth);
  }
}

export const renderPhrasingContent = (node: PhrasingContent, depth?: Depth): JSX.Element => {
  switch (node.type) {
    case "text":
    case "emphasis":
    case "strong":
    case "delete":
    case "html":
    case "inlineCode":
    case "break":
    case "image":
    case "imageReference":
    case "footnote":
    case "footnoteReference":
      return renderStaticPhrasingContent(node, depth);
    case "link":
      const link = node as Link;
      return renderLink(link, depth);
    case "linkReference":
      const linkReference = node as LinkReference;
      return renderLinkReference(linkReference, depth);
  }
}

export const renderParagraph = (paragraph: Paragraph) => {
  return (
    <View>
      {
        paragraph.children.map(renderNode)
      }
    </View>
  );
}
export const renderHeading = (heading: Heading) => {
  return (
    <View>
      {
        heading.children.map((phrasingContent) => renderPhrasingContent(phrasingContent, heading.depth))
      }
    </View>
  )
}
export const renderThematicBreak = (_thematicBreak: ThematicBreak) => {
  return (
    <View style={{
        height: 1,
        backgroundColor: 'rgba(255, 255, 255 ,0.3)',
        alignSelf: 'stretch'
    }}/>
  );
}
export const renderBlockquote = (blockquote: Blockquote) => {
  return (
    <View
      style={{
        padding: 12,
        backgroundColor: 'gray',
      }}
    >
      {
        blockquote.children.map(renderNode)
      }
    </View>
  )
}
export const renderList = (list: List) => {
  return (
    <View>
      {
        list.children.map((item, index) => {
          return (
            <View
              style={{
                flexDirection: 'row'
              }}
            >
              {
                list.ordered ? <TextBlock>{list.start?? + index}</TextBlock> : <TextBlock>•</TextBlock>
              }
              {
                renderListItem(item)
              }
            </View>
          )
        })
      }
    </View>
  )
}
export const renderListItem = (listItem: ListItem): JSX.Element => {
  return (
    <View
      style={{
        flexDirection: 'row'
      }}
    >
      {
        listItem.children.map(renderNode)
      }
    </View>
  )
}
export const renderTable = (table: Table) => {
  return (
    <View>
      <TableComponent>
        {
          table.children.map(row => {
            return renderTableRow(row);
          })
        }
      </TableComponent>
    </View>
  )
}
export const renderTableRow = (tableRow: TableRow) => {
  return (
    <Row
      data={tableRow.children.map(renderTableCell)}
    />
  )
}
export const renderTableCell = (tableCell: TableCell) => {
  return (
    <View>
      {
        tableCell.children.map(content => renderPhrasingContent(content))
      }
    </View>
  )
}
export const renderHTML = (html: HTML, depth?: Depth) => {
  return (
    <View>
      <TextBlock>
        {
          html.value
        }
      </TextBlock>
    </View>
  )
}
export const renderCode = (code: Code) => {
  return (
    <View>
      <TextBlock>
        {
          code.value
        }
      </TextBlock>
    </View>
  )
}
export const renderYAML = (yaml: YAML) => {
  return (
    <View>
      <TextBlock>
        {
          yaml.value
        }
      </TextBlock>
    </View>
  )
}
export const renderDefinition = (definition: Definition) => {
  return (
    <View>
      
    </View>
  )
}
export const renderFootnoteDefinition = (footnoteDefinition: FootnoteDefinition) => {
  return (
    <View>
      
    </View>
  )
}
export const renderText = (text: Text, depth?: Depth) => {
  return (
    <TextBlock>
      {
        text.value
      }
    </TextBlock>
  )
}
export const renderEmphasis = (emphasis: Emphasis, depth?: Depth) => {
  return (
    <View>
      
    </View>
  )
}
export const renderStrong = (strong: Strong, depth?: Depth) => {
  return (
    <View>
      
    </View>
  )
}
export const renderDelete = (deleteNode: Delete, depth?: Depth) => {
  return (
    <View>
      
    </View>
  )
}
export const renderInlineCode = (inlineCode: InlineCode, depth?: Depth) => {
  return (
    <View>
      
    </View>
  )
}
export const renderBreak = (breakNode: Break, depth?: Depth) => {
  return (
    <View>
      
    </View>
  )
}
export const renderLink = (link: Link, depth?: Depth) => {
  return (
    <View>
      
    </View>
  )
}
export const renderImage = (image: Image, depth?: Depth) => {
  return (
    <View>
      
    </View>
  )
}
export const renderLinkReference = (linkReference: LinkReference, depth?: Depth) => {
  return (
    <View>
      
    </View>
  )
}
export const renderImageReference = (imageReference: ImageReference, depth?: Depth) => {
  return (
    <View>
      
    </View>
  )
}
export const renderFootnote = (footnote: Footnote, depth?: Depth) => {
  return (
    <View>
      
    </View>
  )
}
export const renderFootnoteReference = (footnoteReference: FootnoteReference, depth?: Depth) => {
  return (
    <View>
      
    </View>
  )
}