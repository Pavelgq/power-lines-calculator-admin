
import { Button, Link } from '@mui/material';
import { useState } from 'react';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { ClientKeyProps } from './ClientKey.props';


export function ClientKey({keyValue, lifetime = 0}: ClientKeyProps): JSX.Element {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (keyValue) {
      navigator.clipboard.writeText(keyValue);
    }
    setCopied(true);
  }


  if (keyValue) {
    return (
      <>
        {keyValue}
        <Button onClick={handleCopy}><ContentCopyIcon /></Button>

        {copied ? <span style={{color: 'red'}}>Copied.</span> : null}
      </>
    )
  }

  return (
    <>
      {lifetime}
      <Button type='submit'>Генерировать</Button>
    </>
  )
}