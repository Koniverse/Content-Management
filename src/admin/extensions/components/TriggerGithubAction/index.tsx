import React, {useState, useEffect} from "react"
import {Button} from "@strapi/design-system"
import axios from 'axios';
import {useSelector} from 'react-redux';

const Index = ({}) => {
  // @ts-ignore
  const {contentType} = useSelector((state) => state['content-manager_listView'] || {});
  const [loading, setLoading] = useState(false);
  const {apiID} = contentType;
  const [isEnabled, setIsEnabled] = useState(false);
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`/api/githubAction/getEnabled/${apiID}`);
        setIsEnabled(response.data.enabled)
      } catch (e) {
      }
    }
    getData();
  }, [apiID]);
  const openInNewTab = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };
  const handleClick = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/githubAction/executed/${apiID}`);
      const {executed, urlWorkflow} = response.data;
      if (executed && urlWorkflow) {
        openInNewTab(urlWorkflow);
      }
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  }

  return (
    <>
      {isEnabled && <Button loading={loading} onClick={handleClick}>Trigger Github Action</Button>}
    </>
  )
}

export default Index;
