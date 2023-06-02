import moment from "moment";

export function formatDate(timestamp) {
  const targetMoment = moment.unix(timestamp);
  const formattedTimeAgo = targetMoment.fromNow();
  const formattedTime = targetMoment.format("HH:mm");
  const formattedDate = targetMoment.format("Do MMM");

  return {
    timeAgo: formattedTimeAgo,
    time: formattedTime,
    date: formattedDate,
  };
}

// function formatDateDifference(timeDiff) {
//   if (timeDiff < 60) {
//     return `${timeDiff} seconds ago`;
//   } else if (timeDiff < 3600) {
//     const minutes = Math.floor(timeDiff / 60);
//     return `${minutes} minutes ago`;
//   } else {
//     const hours = Math.floor(timeDiff / 3600);
//     return `${hours} hours ago`;
//   }
// }
