import { useState, useEffect } from "react";
import {getGroup} from '../services/studentService'
import{group} from '../Types'

export const useGroup = () => {
  const [group, setGroup] = useState<group[]>([]);
  const [reload, setReload] = useState(false)

  useEffect(() => {
    fetchData();
  }, [reload]);

  const fetchData = async () => {
    try {
      const studentsData = await getGroup();
      setGroup(studentsData);
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    }
  };

  const reloadData = () => {
    setReload((prev) => !prev);
  };

  return {
    group,
    reloadData,

  };
};
