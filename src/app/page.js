import styles from "./page.module.css";
import Title from "./components/Title";
import Tasktitle from "./components/formComponents/Tasktitle";
import Taskform from "./components/formComponents/Taskform";
import Taskstitle from "./components/tasksComponents/Taskstitle";
import Upcomingtasks from "./components/tasksComponents/Upcomingtasks";

export default function Home() {
  return (
    <main className={styles.main}>
      <Title />

      <section className="task-form-section">
        <Tasktitle />
        <div className="form-contaier">
          <Taskform />
        </div>
      </section>

      <section className="your-tasks-section">
        <div>
          <Taskstitle />
        </div>

        <div className="all-tasks">
          <Upcomingtasks />
          
        </div>
      </section>

    </main>
  );
}
