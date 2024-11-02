import { useEffect, useState } from 'react';
import {lesson} from '../Types';
import {getLesson} from '../services/lessonService';



export const useLesson = () => {
    const [lessons, setLessons] = useState<lesson[]>([]);
    const [reload, setReload] = useState(false);


    useEffect(() => {
        fetchData();
    }, [reload]);

    const reloadData = () => {
        setReload((prev) => !prev);
      };


    const fetchData = async () => {
        try {
          const lessonData = await getLesson();
          setLessons(lessonData);
        } catch (error) {
          console.error("Error al obtener los datos:", error);
        }
      };


    return{
        lessons,
        reloadData,
    }

}