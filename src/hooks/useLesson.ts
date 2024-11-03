import { useEffect, useState } from 'react';
import {lesson} from '../Types';
import {getLesson} from '../services/lessonService';
import {addLesson} from '../services/lessonService';



export const useLesson = () => {
    const [lessons, setLessons] = useState<lesson[]>([]);
    const [reload, setReload] = useState(false);

    useEffect(() => {
        fetchData();
    }, [reload]);




    const fetchData = async () => {
        try {
          const lessonData = await getLesson();
          setLessons(lessonData);
        } catch (error) {
          console.error("Error al obtener los datos:", error);
        }
      };

      const createLesson = async (newLesson: lesson) => {
        try {
          await addLesson(newLesson);
          reloadData();
        } catch (error) {
          console.error("Error al crear el estudiante:", error);
        }
      };

      const reloadData = () => {
        setReload((prev) => !prev);
      };

    

    return{
        lessons,
        reloadData,
        createLesson,
    }

}