import React, { useState, useEffect } from "react";
import { Button } from "@strapi/design-system";
import { useSelector } from "react-redux";
import { useFetchClient, useNotification } from "@strapi/helper-plugin";
import {
  fetchDataGithub,
  createDataToStrapi,
  getDataFromStrapi,
} from "./fetchDataGithub";

const Index = ({}) => {
  const toggleNotification = useNotification();
  const { get, post } = useFetchClient();
  // @ts-ignore
  const { contentType } = useSelector((state) => state["content-manager_listView"] || {});
  const [loading, setLoading] = useState(false);
  const [roleUsers, setRoleUsers] = useState([]);
  const { apiID, uid } = contentType;
  const [isEnabled, setIsEnabled] = useState(false);

  const showNotification = (message: string) => {
    toggleNotification({
      // required
      type: "warning",
      // required
      message: { id: "trigger.button.message", defaultMessage: message },
      // optional
      title: {
        id: "Warning: Trigger Github Action",
        defaultMessage: "Trigger Github Action Failed: ",
      },
    });
  };

  useEffect(() => {
    const getData = async () => {
      const { data } = await get("/admin/users/me");
      const user = data.data;
      if (!user) {
        return;
      }
      const roles = user.roles.map((role) => role.id);
      setRoleUsers(roles);
      try {
        const response = await post(
          `/api/github-action/enabled`,
          { apiID, uid, roles },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setIsEnabled(response.data.enabled);
      } catch (e) {}
    };
    getData();
  }, [apiID]);
  const openInNewTab = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };
  const handleClick = async () => {
    try {
      setLoading(true);
      const response = await post(
        `/api/github-action/executed`,
        { apiID, uid, roles: roleUsers },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const { executed, urlWorkflow, message } = response.data;
      if (executed && urlWorkflow) {
        openInNewTab(urlWorkflow);
      }
      if (!executed && message) {
        showNotification(message);
      }
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };

  const handleFetchData = async () => {
    try {
      setLoading(true);
      const MergeDataCrawl = await fetchDataGithub();
      const dataStrapi = await getDataFromStrapi();

      //check object in MergeDataCrawl
      for (const index in MergeDataCrawl) {
        const temp = MergeDataCrawl[index];
        const containsTarget = dataStrapi.some((obj) => {
          return Object.keys(temp).every((key) => {
            return JSON.stringify(obj[key]) === JSON.stringify(temp[key]);
          });
        });
        if (!containsTarget) {
          const record = MergeDataCrawl[index];
          const refactorData = {
            data: {},
          };
          refactorData.data = record;
          createDataToStrapi(refactorData);
        }
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  

  return (
    <>
      {isEnabled && (
        <Button loading={loading} onClick={handleClick}>
          Trigger Github Action
        </Button>
      )}
      {
        <Button loading={loading} onClick={handleFetchData}>
          Refresh Data
        </Button>
      }
    </>
  );
};
export default Index;
