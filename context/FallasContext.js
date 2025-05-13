
import React, { createContext, useContext, useState, useEffect } from 'react';

const FallasContext = createContext();

export const useFallasContext = () => useContext(FallasContext);

export const FallasProvider = ({ children }) => {
  const [VLCitems, setVLCitems] = useState([]);
  const [VLCitemsInfantil, setVLCitemsInfantil] = useState([]);
  

  // Función para cargar los datos de la API
  const loadData = async () => {
    let allRecordsMayor = [];
    let allRecordsInfantil = [];
    let limit = 100;
    let totalRecords = 349;

    for (let offset = 0; offset < totalRecords; offset += limit) {
      try {
        const responseFallasMayor = await fetch(
          `https://valencia.opendatasoft.com/api/explore/v2.1/catalog/datasets/falles-fallas/records?limit=${limit}&offset=${offset}`
        );
        const dataMayor = await responseFallasMayor.json();

        const responseFallasInfantil = await fetch(
          `https://valencia.opendatasoft.com/api/explore/v2.1/catalog/datasets/falles-infantils-fallas-infantiles/records?limit=${limit}&offset=${offset}`
        );

        const dataInfantil = await responseFallasInfantil.json();

        allRecordsMayor = allRecordsMayor.concat(dataMayor.results);
        allRecordsInfantil = allRecordsInfantil.concat(dataInfantil.results);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    }

    setVLCitems(allRecordsMayor);
    setVLCitemsInfantil(allRecordsInfantil);
  };

  useEffect(() => {
    loadData();
    
  }, []);

  return (
    <FallasContext.Provider
      value={{
        VLCitems,
        VLCitemsInfantil,
      }}
    >
      {children}
    </FallasContext.Provider>
  );
};
