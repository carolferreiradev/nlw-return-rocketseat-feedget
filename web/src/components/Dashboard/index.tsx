import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { api } from "../../services/api";

import Chart from "react-apexcharts";

import CountUp from "react-countup";

import { Header } from "../Header";

import { FeedbackType, feedbackTypes } from "../WidgetForm";

interface IFeedbackTypeResponse {
  id: string;
  type: string;
  comment: string;
  screenshot?: string;
}

export function Dashboard() {
  const navigate = useNavigate();
  const [options, setOptions] = useState({});
  const [series, setSeries] = useState([]);
  const [feedbackSize, setFeedbackSize] = useState(0);
  const [feedbacksList, setFeedbacksList] = useState<IFeedbackTypeResponse[]>(
    []
  );
  const feedbacks = Object.entries(feedbackTypes).map(([key, _]) => key);

  function TotalFeedback(responseFeedback) {
    return feedbacks.map((feedbackTypeT: FeedbackType) => {
      const feedbackFiltered = responseFeedback.filter(
        (feedback: IFeedbackTypeResponse) => {
          if (feedback.type === feedbackTypeT) {
            return feedback;
          }
        }
      );

      return feedbackFiltered.length;
    });
  }
  function TotalFeedbackByType(amountFeedbacks: any[]): number {
    return amountFeedbacks.reduce((sum, i) => {
      return sum + i;
    });
  }

  useEffect(() => {
    const user = localStorage.getItem("user-drinkshome");
    if (user) {
      (async () => {
        const { data } = await api.get("/feedbacks");
        setFeedbacksList(data.data || []);
        const amountFeedbackByType = TotalFeedback(data.data);
        const sumAllFeedback = TotalFeedbackByType(amountFeedbackByType);
        const feedbackOption = {
          chart: {
            id: "basic-bar",
            foreColor: "#934ac4",
            fontFamily: "Inter, sans-serif",
          },
          xaxis: {
            categories: feedbacks,
          },
          fill: {
            fill: {
              opacity: 0.3,
              type: "gradient",
              gradient: {
                shade: "dark",
                opacityFrom: 0.7,
                opacityTo: 0.3,
              },
            },
          },
        };
        const feedbackSeries = [
          {
            name: "Feedbacks",
            data: amountFeedbackByType,
          },
        ];
        setFeedbackSize(sumAllFeedback);
        setOptions(feedbackOption);
        setSeries(feedbackSeries);
      })();
    } else {
      navigate("/feedbacks/login");
    }
  }, []);

  return (
    <>
      <Header dashboard insertUser />

      <div className="flex items-center text-center flex-col mt-10">
        <div className="flex items-center w-[80vw] justify-between charts-columns">
          <Chart
            type="area"
            height={300}
            width={300}
            options={options}
            series={series}
          />
          <Chart
            type="bar"
            height={300}
            width={300}
            options={options}
            series={series}
          />
          <div
            className="rounded-lg bg-purple-600 p-10 text-4xl"
            title="Total de feedbacks"
          >
            <CountUp end={feedbackSize} />
          </div>
        </div>
      </div>
      <div className="flex items-center text-center flex-col my-10">
        <h2 className="text-brand-500 text-2xl text-center font-semibold mb-10">
          Feedback listing
        </h2>
        <div
          className="text-zinc-500 dark:text-zinc-400 dark:hover:text-zinc-100 hover:text-zinc-800 h-96 overflow-auto
          w-[80vw]
          mx-auto
          scrollbar-thumb-zinc-200
          dark:scrollbar-thumb-zinc-700
          scrollbar-track-transparent
          scrollbar-thin
          "
        >
          <table className="table-auto w-full text-sm text-left text-zinc-500 dark:text-zinc-400">
            <thead className="text-xs text-zinc-700 uppercase bg-purple-50 dark:bg-purple-700 dark:text-zinc-400">
              <tr>
                <th scope="col" className="px-6 py-3 text-center">
                  ID
                </th>

                <th scope="col" className="px-6 py-3">
                  Type
                </th>

                <th scope="col" className="px-6 py-3">
                  Comment
                </th>

                <th scope="col" className="px-6 py-3 text-center">
                  Screenshot
                </th>
              </tr>
            </thead>
            <tbody>
              {feedbacksList.map((feedbackItem: any) => (
                <>
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <td className="px-6 py-4 text-center">{feedbackItem.id}</td>

                    <td className="px-6 py-4">{feedbackItem.type}</td>

                    <td className="px-6 py-4">{feedbackItem.comment}</td>

                    <td className="px-6 py-4 text-center flex justify-center items-center">
                      {feedbackItem.screenshot ? (
                        <img
                          alt={feedbackItem.comment}
                          src={feedbackItem.screenshot}
                          width={52}
                          height={52}
                        />
                      ) : (
                        <>Nenhuma imagem cadastrada para esse feedback.</>
                      )}
                    </td>
                  </tr>
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
