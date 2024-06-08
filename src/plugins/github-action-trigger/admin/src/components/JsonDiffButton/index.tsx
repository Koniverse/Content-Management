import React, {useState, useEffect, useCallback} from "react"
import {Button} from "@strapi/design-system"
import {useCMEditViewDataManager} from '@strapi/helper-plugin';
import {Buffer} from 'buffer';


const Index = ({}) => {

  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState('');
  const [display, setDisplay] = useState(false);
  const {allLayoutData, modifiedData, isCreatingEntry} = useCMEditViewDataManager();
  const {uid} = allLayoutData.contentType?.uid ? allLayoutData.contentType : {uid: "undefined"};
  const allowedUID = ['api::audit-log.audit-log'];

  useEffect(() => {
    (async () => {
      try {
        setDisplay(!(isCreatingEntry || !allowedUID.includes(uid)))
        if (display) {
          const {fromData, toData} = modifiedData
          const jsonDiff = GenerateJsonDiff(fromData, toData)
          setUrl(jsonDiff)
        }

      } catch (e) {
        console.error(e);
      }
    })();
  });

  const openInNewTab = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };
  const ToBase64 = (json: any) => {
    const str = JSON.stringify(json);
    return Buffer.from(str).toString('base64');
  }

  const GenerateJsonDiff = (data1: any, data2: any) => {
    return `https://jsondiff.com/?left=data:base64,${ToBase64(JSON.parse(data1))}&right=data:base64,${ToBase64(JSON.parse(data2))}`
  }


  const handleClick = useCallback((url) => async () => {
      try {
        setLoading(true);
        console.log("handleClick", url)
        openInNewTab(url);
        setLoading(false);
      } catch (e) {
        setLoading(false);
      }
    }
    , []);
  return (
    <>
      <Button
        onClick={handleClick(url)}
        loading={loading}
        display={display ? 'block' : 'none'}
      >
        Json Diff
      </Button>
    </>
  )
}

export default Index;
