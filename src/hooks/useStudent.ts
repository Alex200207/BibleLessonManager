import { useEffect, useState } from 'react';
import { getStudents, getScore, getGroup, addKid } from '../services/studentService';
import { kids, score as scoreType, group as groupType } from '../Types/index';

export const useStudent = () => {
  const [students, setStudents] = useState<kids[]>([]);
  const [score, setScore] = useState<scoreType[]>([]);
  const [group, setGroup] = useState<groupType[]>([]);
  const [reload, setReload] = useState(false); 

  useEffect(() => {
   
    fetchData();
    getGroupData();
  }, [reload]); // Dependencia en 'reload'


  

  const fetchData = async () => {
    try {
     
      const studentsData = await getStudents();
      setStudents(studentsData);

      const scoreData = await getScore();
      setScore(scoreData);
    } catch (error) {
      console.error('Error al obtener los datos:', error);
    }
  };

  const getGroupData = async () => {
    try {
      const groupData = await getGroup();
      setGroup(groupData);
    } catch (error) {
      console.error('Error al obtener los datos:', error);
    }
  };

  const createKid = async (newKid: kids) => {
    try {
      await addKid(newKid);
    } catch (error) {
      console.error('Error al crear el estudiante:', error);
    }
  };
  
  const reloadData = () => {
    console.log('Reloading data');
    setReload((prev) => {
      console.log('Previous reload state:', prev);
      const newState = !prev; // Calcula el nuevo estado
      console.log('New reload state:', newState); // Log del nuevo estado
      return newState; // Devuelve el nuevo estado
    });
  };
  

  return {
    students,
    score,
    group,
    createKid, 
    reloadData,
  };
};
