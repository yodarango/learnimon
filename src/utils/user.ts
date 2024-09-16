export function orderUsersByScore(users: Record<string, any>[]) {
  // order users by score number in descending order
  users.sort(
    (a: Record<string, any>, b: Record<string, any>) => b.score - a.score
  );

  // add placement to each user
  users.forEach((user: Record<string, any>, index: number) => {
    user.placement = addOrdinalSuffix(index + 1);
  });

  return users;
}

function addOrdinalSuffix(num: number) {
  // Handle special cases for 11th, 12th, and 13th
  const specialCases = [11, 12, 13];
  const lastTwoDigits = num % 100;

  if (specialCases.includes(lastTwoDigits)) {
    return num + "th";
  }

  // Handle general cases based on the last digit
  const lastDigit = num % 10;

  switch (lastDigit) {
    case 1:
      return num + "st";
    case 2:
      return num + "nd";
    case 3:
      return num + "rd";
    default:
      return num + "th";
  }
}
