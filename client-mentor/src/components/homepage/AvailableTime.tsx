import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  CalendarOutlined,
} from '@ant-design/icons';
import { PageMentorQuery } from '@gql/type';
import { Button, Space } from 'antd';
import dayjs from 'dayjs';
import { useMemo, useState } from 'react';
import duration from 'dayjs/plugin/duration';
import TitlePart from './TitlePart';
import { LIST_COLOR } from '@/utils/enum';
import { Paragraph } from '@/utils/utils';

dayjs.extend(duration);
const weekend = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

interface IDate {
  isPast: boolean;
  day: number;
}

export interface IAvailability {
  duration_session: number; // số chẳn
  available_time: boolean[];
  duration_work_per_day: number[];
  number_session_per_day: number;
  absent_date: Date[];
  isActive: boolean;
  bookingList: number[];
}

function AvailableTime({
  data,
  setChooseSession,
}: {
  data: PageMentorQuery['getPageMentor'];
  setChooseSession: React.Dispatch<React.SetStateAction<Date | null>>;
}) {
  const availability = data.setting.availability as IAvailability;

  const myDay = useMemo(
    () => ({
      week: dayjs().day(),
      day: dayjs().date(), // 3
      month: dayjs().month(),
      daysInMonth: dayjs().daysInMonth(),
      session_booked: availability.bookingList.map((value) => dayjs(value)),
    }),
    [],
  );

  const listDateDefault = useMemo(() => {
    const array: IDate[] = new Array(7).fill({ isPast: false, day: 0 });
    return array.map((_value, i) => {
      const day = myDay.day + i - myDay.week;
      if (i < myDay.week) {
        if (day <= 0) {
          // nếu ngày nhỏ hơn 0 nghỉ ngày của tháng củ
          const daysInMonth = dayjs(dayjs().unix() - 86400 * 7).daysInMonth(); // tháng trước bao nhiêu ngày

          return { isPast: false, day: daysInMonth + day };
        }
        return { isPast: false, day };
      }

      if (i === myDay.week) {
        return { isPast: true, day: myDay.day };
      }

      if (day > myDay.daysInMonth) {
        return { isPast: true, day: day - myDay.daysInMonth };
      }
      return { isPast: true, day };
    });
  }, []);

  const [listDateOfWeek, setListDateOfWeek] = useState<IDate[]>(listDateDefault);
  const [dayChoose, setDateChoose] = useState<number | null>(dayjs().date());

  // console.log(listDateOfWeek);

  const handelNextWeek = (isNext: boolean) => {
    if (isNext) {
      const listDateOfWeekNext = listDateOfWeek.map((value) => {
        let nextDay = value.day + 7;
        if (nextDay > myDay.daysInMonth) {
          nextDay = myDay.daysInMonth - (value.day + 7);
          // value.day + 7 > 30 ngày trừ đi nó sẽ ra những ngà tiếp theo
          myDay.month += 1;
          myDay.daysInMonth = dayjs(`${myDay.month}-1-2023`).daysInMonth();
          return { isPast: true, day: nextDay };
        }

        return { isPast: true, day: nextDay };
      });
      setListDateOfWeek([...listDateOfWeekNext]);
    } else if (myDay.month === dayjs().month()) {
      const isPast = listDateOfWeek.some((value) => value.day === dayjs().date());
      if (!isPast) {
        const listDateOfWeekNext = listDateOfWeek.map((value) => {
          let pastDay = value.day - 7;
          if (pastDay < 1) {
            myDay.month -= 1;
            myDay.daysInMonth = dayjs(`${myDay.month}-1-2023`).daysInMonth();

            pastDay = myDay.daysInMonth - pastDay;

            return { isPast: true, day: pastDay };
          }

          return { isPast: true, day: pastDay };
        });

        setListDateOfWeek(listDateOfWeekNext);
      }
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', rowGap: 5 }}>
      <TitlePart
        Icon={<CalendarOutlined style={{ fontSize: 40 }} />}
        content={['Mentor available', `Mentor: ${data.first_name} ${data.last_name}`]}
      />
      <div />
      <Paragraph>
        Duration session:
        {dayjs.duration(availability.duration_session, 'seconds').format('H[h] m[m]')}
      </Paragraph>
      <div style={{ display: 'flex' }}>
        <Button onClick={() => {}}>
          <ArrowLeftOutlined />
        </Button>
        <Space size={[0, 6]} style={{ columnGap: 3, flexGrow: 1 }}>
          {weekend.map((value, i) => (
            <div key={value}>
              <Button
                disabled={!listDateOfWeek[i].isPast}
                style={{
                  margin: 0,
                  padding: 0,
                  width: 40,
                  textAlign: 'center',
                  backgroundColor: LIST_COLOR[i + 1],
                }}
              >
                {value}
              </Button>
              <div>
                <p> {listDateOfWeek[i].day}</p>
              </div>
            </div>
          ))}
        </Space>
        <Button onClick={() => {}}>
          <ArrowRightOutlined />
        </Button>
        p
      </div>

      {/* <div>{new Array(availability.number_session_per_day).map(e => {
        if()
      })}</div> */}
    </div>
  );
}

export default AvailableTime;
