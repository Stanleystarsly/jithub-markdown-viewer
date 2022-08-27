import {unified} from 'unified';
import remarkParse from 'remark-parse';
import remarkFrontmatter from 'remark-frontmatter';
import remarkGfm from 'remark-gfm';
import {
  renderNode,
} from '../components/renderer';

export const parse = async (markdown: string) => {
  const file = await unified()
    .use(remarkParse)
    .use(remarkFrontmatter)
    .use(remarkGfm)
    .parse(markdown);

  console.log(file.type);
  console.log(file);

  return file.children.map(renderNode);
}
