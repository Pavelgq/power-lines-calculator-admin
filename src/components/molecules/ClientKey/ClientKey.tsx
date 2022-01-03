
import { Button, Link } from '@mui/material';
import { useState } from 'react';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import moment from '../../../helpers/date';
import { ClientKeyProps } from './ClientKey.props';
import { KeygenDialog } from '../KeygenDialog/KeygenDialog';


export function ClientKey({keyValue, lifetime = ''}: ClientKeyProps): JSX.Element {
  const [copied, setCopied] = useState(false);
  const [openGenerate, setOpenGenerate] = useState(false);

  const handleCopy = () => {
    if (keyValue) {
      navigator.clipboard.writeText(keyValue);
    }
    setCopied(true);
  }

  const handleGenerate = () => {
    setOpenGenerate(true);
  }

  if (keyValue) {
    return (
      <>
        <span>
          {keyValue}
          <Button onClick={handleCopy}><ContentCopyIcon /></Button>

          {copied ? <span style={{color: 'red'}}>Copied.</span> : null}
        </span>
        <span>
          действителен до {moment(lifetime, moment.ISO_8601).format('DD MMMM YYYY')}
        </span>
      </>
    )
  }

  return (
    <>
      <KeygenDialog toggle={openGenerate} handleClose={setOpenGenerate}/>
      <Button type='submit' onClick={handleGenerate}>Генерировать</Button>
    </>
    
  )
}