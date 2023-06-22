import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BlockyMain from "../components/blocky-main/BlockyMain";
import LoadingSpinner from "../components/common/LoadingSpinner";
import RightSideLayout from "../components/project/right-side/RightSideLayout";
import config from "../config";
import { getById } from "../services/projectAPI";
import { UserContext } from "../hooks/UserContext";
import Student from "../models/student/Student";
import Homework from "../models/homework/Homework";

function Project({ isTeacherOverride }: { isTeacherOverride?: boolean }) {
  const navigator = useNavigate();
  let { isTeacher } = useContext(UserContext);
  const [initialXml, setInitialXml] = useState("");
  const [changedXml, setChangeXml] = useState(initialXml);
  const [htmlText, setHtml] = useState("");
  const [calledDb, setCallDb] = useState(false);
  const [projectName, setProjectName] = useState("default");
  const [isVisibleForShare, setIsVisibleForShare] = useState(true);
  const [comment, setComment] = useState("");
  const [grade, setGrade] = useState(0);
  const [students, setStudents] = useState<Student[]>([]);
  const [homework, setHomework] = useState<Homework>();
  const params = useParams();

  if (isTeacherOverride !== undefined) {
    isTeacher = isTeacherOverride;
  }

  useEffect(() => {
    init();
  }, [params.id]);

  let init = async () => {
    if (params.id) {
      let url = `${config.baseApiUrl}/Projects/${params.id}`;
      if (params.studentId) {
        url += `?ownerId=${params.studentId}`;
        setIsVisibleForShare(false);
      }
      const response = await getById(url);
      if (response?.responseStatus == 200 && response?.project != null) {
        const { xml, comment, grade, name, students, homework } = response.project;
        setInitialXml(xml);
        setComment(comment ?? "");
        setGrade(grade ?? 0);
        setProjectName(name);
        setStudents(students || []);
        setHomework(homework);
      } else {
        navigator("/Error");
      }
      setCallDb(true);
    }
  };
  // to do
  if (!calledDb && params.id) {
    return <LoadingSpinner />;
  }

  return (
    <main className="grid grid-rows-2 h-[90vh] md:grid-cols-[3fr_2fr] bg-[#F8F6F4] h-[90vh]" key={projectName}>
      <section>
        <BlockyMain setHtml={setHtml} xmlFromDb={initialXml} setXml={setChangeXml} />
      </section>
      <section>
        <RightSideLayout
          htmlText={htmlText}
          name={projectName}
          xml={changedXml}
          isVisibleForShare={isVisibleForShare}
          comment={comment}
          grade={grade}
          setGrade={setGrade}
          setComment={setComment}
          students={students}
          refetch={init}
          homework={homework}
        />
      </section>
    </main>
  );
}

export default Project;
