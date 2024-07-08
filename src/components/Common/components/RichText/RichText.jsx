import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useRef,
} from 'react';
import isHotkey from 'is-hotkey';
import isUrl from 'is-url';
import { Editable, withReact, useSlate, Slate } from 'slate-react';
import {
  createEditor,
  Editor,
  Element as SlateElement,
  Transforms,
  Range,
} from 'slate';
import { withHistory } from 'slate-history';
import {
  Code,
  FormatBold,
  FormatItalic,
  FormatListBulleted,
  FormatListNumbered,
  FormatQuote,
  FormatUnderlined,
  LooksOne,
  LooksTwo,
  Link,
  LinkOff,
  PlayCircleFilled,
  Web,
  Ballot,
} from '@material-ui/icons';
import { Button, Icon, Toolbar } from './components';
import { DriveUploader } from '../DriveUploader';
import { Divider } from '@material-ui/core';
import { useIntl } from 'react-intl';
import _ from 'lodash';

import './styles.css';

const HOTKEYS = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline',
  'mod+`': 'code',
};

const LIST_TYPES = ['numbered-list', 'bulleted-list'];

const RichText = ({
  initial,
  readOnly,
  onChange,
  padding,
  editorClassName,
  email,
  isJti,
  iframeHeight,
  ...props
}) => {
  const intl = useIntl();
  const [value, setValue] = useState(
    initial || [{ type: 'paragraph', children: [{ text: '' }] }]
  );

  const renderElement = useCallback(
    (props) => (
      <Element
        {...props}
        email={email}
        isJti={isJti}
        iframeHeight={iframeHeight}
      />
    ),
    []
  );
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
  const editor = useMemo(
    () => withLinks(withHistory(withReact(createEditor()))),
    []
  );

  // useEffect(() => {
  //     setValue(initial)
  // }, [initial])

  function handleValueChange(newValue) {
    setValue(newValue);
    if (onChange) onChange(newValue);
  }

  return (
    <div className='rich-text'>
      <Slate editor={editor} value={value} onChange={handleValueChange}>
        <div
          style={
            !readOnly
              ? {
                  backgroundColor: '#ffffff',
                  margin: 'auto',
                  padding: padding || '20px',
                }
              : null
          }
        >
          {!readOnly && _.get(props, 'displayTools', true) && (
            <Toolbar>
              <MarkButton format='bold' icon={<FormatBold />} />
              <MarkButton format='italic' icon={<FormatItalic />} />
              <MarkButton format='underline' icon={<FormatUnderlined />} />
              <MarkButton format='code' icon={<Code />} />
              <BlockButton format='heading-one' icon={<LooksOne />} />
              <BlockButton format='heading-two' icon={<LooksTwo />} />
              <BlockButton format='block-quote' icon={<FormatQuote />} />
              <BlockButton
                format='numbered-list'
                icon={<FormatListNumbered />}
              />
              <BlockButton
                format='bulleted-list'
                icon={<FormatListBulleted />}
              />
              <LinkButton format='link' icon={<Link />} />
              <RemoveLinkButton format='link-off' icon={<LinkOff />} />
              <Divider style={{ height: 26, width: 1 }} />
              <EmbedButton
                value={value}
                format='embed'
                icon={<PlayCircleFilled />}
              />
              <EmbedSiteButton
                value={value}
                format='embed-large'
                icon={<Web />}
              />
              {_.get(props, 'allowTypeform') && (
                <EmbedTypeformButton
                  allowTypeform={_.get(props, 'allowTypeform')}
                  value={value}
                  format='embed-large'
                  icon={<Link />}
                />
              )}
            </Toolbar>
          )}
          <Editable
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            placeholder={
              !readOnly &&
              intl.formatMessage({ id: 'common.rich_text_placeholder' })
            }
            spellCheck
            className={editorClassName}
            onKeyDown={(event) => {
              for (const hotkey in HOTKEYS) {
                if (isHotkey(hotkey, event)) {
                  event.preventDefault();
                  const mark = HOTKEYS[hotkey];
                  toggleMark(editor, mark);
                }
              }
            }}
            readOnly={readOnly}
          />
        </div>
      </Slate>
    </div>
  );
};

const toggleBlock = (editor, format) => {
  const isActive = isBlockActive(editor, format);
  const isList = LIST_TYPES.includes(format);

  Transforms.unwrapNodes(editor, {
    match: (n) =>
      LIST_TYPES.includes(
        !Editor.isEditor(n) && SlateElement.isElement(n) && n.type
      ),
    split: true,
  });
  const newProperties = {
    type: isActive ? 'paragraph' : isList ? 'list-item' : format,
  };
  Transforms.setNodes(editor, newProperties);

  if (!isActive && isList) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};

const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

const isBlockActive = (editor, format) => {
  const [match] = Editor.nodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === format,
  });

  return !!match;
};

const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

const EmbedElement = ({
  attributes,
  children,
  url,
  email,
  parentElement,
  ratio: ratioInput,
  width: widthInput,
  height: heightInput,
}) => {
  const [width, setWidth] = useState(widthInput || 640);
  const [height, setHeight] = useState(heightInput || 360);

  const ratio = ratioInput || 1.7;

  // Handle mobile display
  useEffect(() => {
    if (parentElement.current) {
      setWidth(parentElement.current.offsetWidth);
      setHeight(parentElement.current.offsetWidth / ratio);
    }
  }, [parentElement]);

  const parser = new DOMParser();
  const parsedEmbed = parser
    .parseFromString(url, 'text/html')
    .getElementsByTagName('iframe');
  let finalUrl = url;
  if (parsedEmbed.length > 0) {
    finalUrl = parsedEmbed[0].getAttribute('src');
  }
  // Typeform url with dynamic user email
  if (email) {
    finalUrl = `${finalUrl}#email=${email}`;
  }

  return (
    <div {...attributes}>
      <iframe
        src={finalUrl}
        frameBorder='0'
        style={{
          maxWidth: '100%',
          maxHeight: heightInput || '100%',
          width: width,
          height: height,
        }}
      />

      {children}
    </div>
  );
};

const Element = ({
  attributes,
  children,
  element,
  email,
  isJti,
  iframeHeight,
}) => {
  const videoParent = useRef();

  switch (element.type) {
    case 'block-quote':
      return <blockquote {...attributes}>{children}</blockquote>;
    case 'bulleted-list':
      return <ul {...attributes}>{children}</ul>;
    case 'heading-one':
      return <h1 {...attributes}>{children}</h1>;
    case 'heading-two':
      return <h2 {...attributes}>{children}</h2>;
    case 'list-item':
      return <li {...attributes}>{children}</li>;
    case 'numbered-list':
      return <ol {...attributes}>{children}</ol>;
    case 'link':
      const target = isJti ? '_self' : '_blank';
      return (
        <a {...attributes} target={target} href={element.url}>
          {children}
        </a>
      );
    case 'embed':
      return (
        <div {...attributes} ref={videoParent}>
          <EmbedElement
            children={children}
            url={element.url}
            parentElement={videoParent}
          />
        </div>
      );
    case 'embed-large':
      const isDriveUploader =
        element.url.includes('driveuploader.com') && isJti;
      const splitUrl = element.url.split('/');
      const duId = splitUrl[4];

      return (
        <div {...attributes} ref={videoParent}>
          {isDriveUploader && <DriveUploader id={duId} email={email} />}
          {!isDriveUploader && (
            <EmbedElement
              children={children}
              url={element.url}
              parentElement={videoParent}
              ratio={0.5}
              width='calc(100% - 6px)'
              height={iframeHeight || 'calc(100vh - 100px)'}
            />
          )}
        </div>
      );
    case 'embed-typeform':
      return (
        <div {...attributes} ref={videoParent}>
          <EmbedElement
            children={children}
            url={element.url}
            email={email}
            parentElement={videoParent}
            ratio={0.5}
            width='calc(100% - 6px)'
            height={'calc(100vh - 100px)'}
          />
        </div>
      );
    default:
      return <p {...attributes}>{children}</p>;
  }
};

const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.code) {
    children = <code>{children}</code>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  return <span {...attributes}>{children}</span>;
};

const BlockButton = ({ format, icon }) => {
  const editor = useSlate();
  return (
    <Button
      active={isBlockActive(editor, format)}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleBlock(editor, format);
      }}
    >
      <Icon>{icon}</Icon>
    </Button>
  );
};

const MarkButton = ({ format, icon }) => {
  const editor = useSlate();
  return (
    <Button
      active={isMarkActive(editor, format)}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleMark(editor, format);
      }}
    >
      <Icon>{icon}</Icon>
    </Button>
  );
};

// LINKS

const withLinks = (editor) => {
  const { insertData, insertText, isInline } = editor;

  editor.isInline = (element) => {
    return element.type === 'link' ? true : isInline(element);
  };

  editor.insertText = (text) => {
    if (text && isUrl(text)) {
      wrapLink(editor, text);
    } else {
      insertText(text);
    }
  };

  editor.insertData = (data) => {
    const text = data.getData('text/plain');

    if (text && isUrl(text)) {
      wrapLink(editor, text);
    } else {
      insertData(data);
    }
  };

  return editor;
};

const insertLink = (editor, url) => {
  if (editor.selection) {
    wrapLink(editor, url);
  }
};

const isLinkActive = (editor) => {
  const [link] = Editor.nodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === 'link',
  });
  return !!link;
};

const unwrapLink = (editor) => {
  Transforms.unwrapNodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === 'link',
  });
};

const wrapLink = (editor, url) => {
  if (isLinkActive(editor)) {
    unwrapLink(editor);
  }

  const { selection } = editor;
  const isCollapsed = selection && Range.isCollapsed(selection);
  const link: LinkElement = {
    type: 'link',
    url,
    children: isCollapsed ? [{ text: url }] : [],
  };

  if (isCollapsed) {
    Transforms.insertNodes(editor, link);
  } else {
    Transforms.wrapNodes(editor, link, { split: true });
    Transforms.collapse(editor, { edge: 'end' });
  }
};

const LinkButton = () => {
  const editor = useSlate();
  const intl = useIntl();

  return (
    <Button
      active={isLinkActive(editor)}
      onMouseDown={(event) => {
        event.preventDefault();
        const url = window.prompt(
          intl.formatMessage({ id: 'game_rules.link_url' })
        );
        if (!url) return;
        insertLink(editor, url);
      }}
    >
      <Link />
    </Button>
  );
};

const insertEmbed = (editor, url, type = 'embed') => {
  const { selection } = editor;
  const isCollapsed = selection && Range.isCollapsed(selection);
  const embed = {
    type: type,
    url,
    children: isCollapsed ? [{ text: '' }] : [],
  };

  if (isCollapsed) {
    Transforms.insertNodes(editor, embed);
  } else {
    Transforms.wrapNodes(editor, embed, { split: true });
    Transforms.collapse(editor, { edge: 'end' });
  }
};

const EmbedButton = () => {
  const editor = useSlate();
  const intl = useIntl();

  return (
    <Button
      active={isLinkActive(editor)}
      onMouseDown={(event) => {
        event.preventDefault();
        const url = window.prompt(
          intl.formatMessage({ id: 'game_rules.code_embed' })
        );
        if (!url) return;
        insertEmbed(editor, url);
      }}
    >
      <PlayCircleFilled />
    </Button>
  );
};

const EmbedSiteButton = () => {
  const editor = useSlate();
  const intl = useIntl();

  return (
    <Button
      active={isLinkActive(editor)}
      onMouseDown={(event) => {
        event.preventDefault();
        const url = window.prompt(
          intl.formatMessage({ id: 'game_rules.site_url' })
        );
        if (!url) return;
        insertEmbed(editor, url, 'embed-large');
      }}
    >
      <Web />
    </Button>
  );
};

const EmbedTypeformButton = (props) => {
  const editor = useSlate();
  const intl = useIntl();

  return (
    <Button
      active={isLinkActive(editor)}
      onMouseDown={(event) => {
        event.preventDefault();
        const url = window.prompt(
          intl.formatMessage({ id: 'game_rules.typeform_url' })
        );
        if (!url) return;
        insertEmbed(editor, `${url}`, 'embed-typeform');
      }}
    >
      <Ballot />
    </Button>
  );
};

const RemoveLinkButton = () => {
  const editor = useSlate();

  return (
    <Button
      active={isLinkActive(editor)}
      onMouseDown={(event) => {
        if (isLinkActive(editor)) {
          unwrapLink(editor);
        }
      }}
    >
      <LinkOff />
    </Button>
  );
};

export default RichText;
