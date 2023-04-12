import { BlockTypeEum, WE_MET_STATUS_ENUM } from "./enums";

function addToSum(metric?: any) {
  return !!metric ? 1 : 0;
}

export function HingleDateMatcher(data: any, dateWhenYouStartedDating: Date) {
  let numberOfLikes = 0;
  let numberOfComments = 0;
  let numberOfMatches = 0;
  let numberOfUnMatches = 0;
  let chats = { total: 0, totalOfLongConv: 0, longest: 0, average: 0, freq: new Array(24).fill(0) };
  let metUps = {
    actualMet: 0,
    HingleIsAsking: 0,
    wasYourType: 0,
    notYourType: 0,
    lastDate: dateWhenYouStartedDating,
  };
  const hoursOfLikesSent = new Array(24).fill(0);

  let endDate = dateWhenYouStartedDating;

  for (let i = 0; i < data.length; i++) {
    const currentData = data[i];

    const like = currentData?.like;
    if (like) {
      const DateOfLiking = new Date(like[0].timestamp);
      if (dateWhenYouStartedDating > DateOfLiking) {
        continue;
      }
      if (DateOfLiking > endDate) {
        endDate = DateOfLiking;
      }

      const hour = DateOfLiking.getHours();
      hoursOfLikesSent[hour]++;

      // @ts-ignore
      if (like[0]?.comment) {
        numberOfComments += 1;
      }

      numberOfLikes += 1;
    }

    const match = currentData?.match;
    numberOfMatches += addToSum(match);
    const block = currentData?.block;

    if (block && block[0].block_type === BlockTypeEum.REMOVE) {
      const DateOfBlock = new Date(block[0].timestamp);
      if (dateWhenYouStartedDating < DateOfBlock) {
        numberOfUnMatches += 1;
      }
    }

    const chat = currentData?.chats;
    if (chat) {
      const lengthOfChat = chat.length;
      
      chats.totalOfLongConv += lengthOfChat > 1 ? 1 : 0;
      chats.total++;
      const longest = chats.longest;
      chats.longest = lengthOfChat > longest ? lengthOfChat : longest;
      chats.average += lengthOfChat;

      chat.forEach(({timestamp}) => {
        chats.freq[new Date(timestamp).getHours()]++;
      })

    }

    const met = currentData?.we_met;
    if (!!met) {
      metUps.HingleIsAsking += 1;
      const matchMeetup = met[0];
      if (matchMeetup.did_meet_subject === WE_MET_STATUS_ENUM.MET_UP) {
        metUps.actualMet += 1;
        // @ts-ignore
        if (matchMeetup["was_my_type"]) {
          metUps.wasYourType += 1;
        } else {
          metUps.notYourType += 1;
        }

        const lastDate = new Date(matchMeetup.timestamp);

        if (metUps.lastDate < lastDate) {
          metUps.lastDate = lastDate;
        }
      }
    }
  }
  chats.average = chats.average / chats.total;

  return {
    numberOfLikes,
    numberOfComments,
    numberOfMatches,
    ratio: {
      comment2like: ((numberOfComments / numberOfLikes) * 100).toFixed(2), // comment to like ratio
      match2like: ((numberOfMatches / numberOfLikes) * 100).toFixed(2), // match to like ratio
      match2comment: ((numberOfMatches / numberOfComments) * 100).toFixed(2),
      conversation2match: ((chats.totalOfLongConv / numberOfMatches) * 100).toFixed(2),
    },
    numberOfUnMatches,
    chats,
    metUps,
    dateWhenYouStartedDating,
    endDate,
    hoursOfLikesSent,
  };
}
