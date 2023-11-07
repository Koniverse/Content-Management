import { Button } from "@strapi/design-system";
import { useFetchClient, useNotification } from "@strapi/helper-plugin";
import { fetchDataGithub } from "./getDataGithub";
import { languages, TransformedObject, MergeData } from "../../../../types";

const Index = ({}) => {
  const { get, post, put } = useFetchClient();
  const fetchDataStrapi = async () => {
    try {
      const response = await get(`ietn/find`, {
        validateStatus: (status) => status < 500,
      });
      const transformedObjects = response.data.map(transformObject);
      return transformedObjects;
    } catch (e) {
      console.error(e);
    }
  };

  const createDataToStrapi = async (record: MergeData) => {
    try {
      const data = record;
      const response = await post(
        `ietn/post`,
        { data },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {}
  };

  const updateDataToStrapi = async (record: MergeData, id: number) => {
    try {
      const response = await put(
        `ietn/update`,
        { record, id },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {}
  };

  function transformObject(input: any): TransformedObject {
    const transformed: TransformedObject = {};

    for (const key in input) {
      if (languages.includes(key)) {
        transformed[key] = {
          web: input[key]?.web,
          mobi: input[key]?.mobi,
          extension: input[key]?.extension,
        };
      }
    }
    transformed["key"] = input.key;
    transformed["id"] = input.id;
    return transformed;
  }

  const handleFetchData = async () => {
    try {
      const dataGithub = await fetchDataGithub();
      const dataStrapi = await fetchDataStrapi();

      for (const index in dataGithub) {
        const temp = dataGithub[index];
        let updateStatus = false;
        let idOjb = 0;
        const containsTarget = dataStrapi.some((obj) => {
          if (obj.key === temp.key) {
            updateStatus = true;
            idOjb = obj.id;
          }
          return Object.keys(temp).every((key) => {
            return JSON.stringify(obj[key]) === JSON.stringify(temp[key]);
          });
        });

        if (!containsTarget) {
          if (updateStatus === false) {
            createDataToStrapi(temp);
          } else if (updateStatus === true) {
            updateDataToStrapi(temp, idOjb);
          }
        }
      }
    } catch (error) {}
  };

  const exportData = async () => {
    try {
      const dataStrapi = await fetchDataStrapi();

      const platforms = ["mobi", "web", "extension"];

      const JSZip = require("jszip");
      const zip = new JSZip();

      for (const lang of languages) {
        for (const platform of platforms) {
          const structuredData = {};
          for (const item of dataStrapi) {
            const key = item.key;
            const dotCount = (key.match(/\./g) || []).length;
            // console.log("dotCount", dotCount);
            if (dotCount == 1) {
              const [firstPart, secondPart] = key.split(".");

              if (!structuredData[firstPart]) {
                structuredData[firstPart] = {};
              }

              structuredData[firstPart][secondPart] = item?.[lang]?.[platform];
            } else {
              const [firstPart, secondPart, thirdPart] = key.split(".");
              if (!structuredData[firstPart]) {
                structuredData[firstPart] = {};
              }
              if (!structuredData[firstPart][secondPart]) {
                structuredData[firstPart][secondPart] = {};
              }
              structuredData[firstPart][secondPart][thirdPart] = item?.[lang]?.[platform];
            }
          }
          const jsonStr = JSON.stringify(structuredData, null, 2);

          const filename = `${platform}_${lang}.json`;

          zip.file(filename, jsonStr);
        }
      }
      // Generate the zip file
      zip.generateAsync({ type: "blob" }).then(function (blob) {
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = "i18n.zip";
        a.click();
      });
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };
  return (
    <>
      <Button onClick={handleFetchData} variant="secondary">
        Fetch Data
      </Button>
      <Button onClick={exportData} variant="secondary">
        Export Data
      </Button>
    </>
  );
};
export default Index;
