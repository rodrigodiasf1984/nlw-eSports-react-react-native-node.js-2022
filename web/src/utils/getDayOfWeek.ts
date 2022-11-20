export function getDayOfWeek(weekDays: string[]) {
  const days: string[] = [];

  weekDays.forEach((weekDay: string) => {
    switch (weekDay) {
      case "0":
        days.push("Domingo");
        break;
      case "1":
        days.push("Segunda");
        break;
      case "2":
        days.push("Terça");
        break;
      case "3":
        days.push("Quarta");
        break;
      case "4":
        days.push("Quinta");
        break;
      case "5":
        days.push("Sexta");
        break;
      case "6":
        days.push("Sabado");
        break;
      default:
        break;
    }
  });

  return days;
}
