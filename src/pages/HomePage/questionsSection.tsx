import { Box } from '@mui/material';
import SectionContainer from '../../components/sectionContainer';
import FadeIn from '../../components/ui/fadeIn';
import SectionTitle from '../../components/ui/sectionTitle';
import QuestionItem from './../../components/ui/questionItem/index';

interface IQuestions {
  title: string;
  text: string;
}

const QuestionsSection = () => {
  const questions: IQuestions[] = [
    {
      title: "Чи підходять ваші курси з '0'?",
      text: `Курси призначені для всіх людей, які готові вкласти час і зусилля в своє майбутнє. \n
        Програма складається з необхідної бази для пошуку роботи(додаткові матеріали є в прикріпленні до кожної теми)
        `,
    },
    {
      title: 'Чи отримаю я сертифікат?',
      text: `Сертифікати - це пережиток минулого! \n
       ІТ - це одна зі сфер , де ціняться ваші персональні якості , професійні знання , а не сертифікат`,
    },
    {
      title: 'Яка зазвичай кількість людей в групі?',
      text: `Ми піклуємось, щоб навчання було комфортним та кожен отримав достатьно уваги та допомоги! \n
         Середня кількість людей в групі - не більше 15.`,
    },
    {
      title:
        'Чи можу я самотужки якось підготуватись для кращого проходження курсу?',
      text: `В індивідуальному порядку ми підбиремо для вас матеріали, виходячи з ваших знань та очікувань.`,
    },
    {
      title: 'А що з пошуком роботи?',
      text: `Ми допоможемо вам з оформленням CV , підготуємо ваші профілі і направимо на найкращі ресурси. \n
        Щодо проходження технічної співбесіти - ви попкрактикуєте це з ментором напротязі курсу, закріплюючи отримані знання`,
    },
  ];

  const renderQuestions: Function = (): JSX.Element[] => {
    return questions.map((q, i) => (
      <QuestionItem questionTitle={q.title} questionText={q.text} key={i} />
    ));
  };

  return (
    <FadeIn type="default">
      <SectionContainer sideTitle="Основне, що цікавить">
        <Box sx={{ width: '100%' }}>
          <Box>
            <Box sx={{ marginBottom: '30px' }}>
              <SectionTitle title="Питання /" spanText=" Відповіді" />
            </Box>
          </Box>
          <Box>{renderQuestions()}</Box>
        </Box>
      </SectionContainer>
    </FadeIn>
  );
};

export default QuestionsSection;
