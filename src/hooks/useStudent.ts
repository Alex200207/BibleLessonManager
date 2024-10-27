// src/hooks/useStudent.ts
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
  }, [reload]);

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
      reloadData(); // Recarga los datos al agregar un estudiante nuevo
    } catch (error) {
      console.error('Error al crear el estudiante:', error);
    }
  };

  const reloadData = () => {
    setReload(prev => !prev);
  };

  return {
    students,
    score,
    group,
    createKid,
    reloadData,
  };
};
