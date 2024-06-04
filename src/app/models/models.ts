export enum StatusGameEnum {
    WaitingOpponent = 0, // Ожидание оппонента
    GameOn = 1, // Идёт игра
    GameOver = 2, // Игра завершена чьей то победой
    GameOverGaveUp = 3, // Игра завершена сдачей
    GameFailed = 4, // Игра завершена из-за времени
    GameOverDraw = 5 // Игра завершена ничьёй
}

export interface MoveGameDto { // запрос на ход в игре
    gameId: number;
    userId: number;
    numberCell: number;
    cell: CellEnum;
    isMoveWin: boolean;
    isDrawGame: boolean;
}

export interface CreateGameDto
{
    userId: number;
    isFreeGame: boolean;
    isPrivateGame: boolean;
    withBot: boolean;
    wallSize: number;
    winSize: number;
    moveTime: number;
    price: number;
    firstStep: FirstStepEnum;
}

export interface JoinGameDto{
    userId: number;
    gameId: number;
}

export interface FinishGameDto{
    userId: number;
    gameId: number;
}

export interface AddBalanceDto { //  запрос на добавление бесплатных пользователю
    userId: number;
    freeCoin: number;
}

export interface SearchGameDto { // Запрос на список игр
    take?: number;
    skip?: number;
    priceFrom?: number;
    priceTo?: number;
    winSizeFrom?: number;
    winSizeTo?: number;
    wallSizeFrom?: number;
    wallSizeTo?: number;
}


export interface GameHistorySearchDto {
    take: number;
    skip: number;
    userId: number;
}

export interface UserDto { // Запрос на инициализацию пользователя
    id: number;
    first_name: string | null;
    last_name?: string | null;
    username?: string | null;
    language_code?: string | null;
    is_premium?: boolean | null;
    added_to_attachment_menu?: boolean | null;
    allows_write_to_pm?: boolean | null;
    photo_url?: string | null;
}

export interface GameHistoryVm { // Ответ на запрос по списку истории игр
    totalCount: number;
    take: number;
    skip: number;
    data: GameHistory[];
}

export interface GameHistory { // История игр
    id: number;
    userId: number;
    finishedDate: string;
    financialMovment: number;
    isFreeGame: boolean;
    statusGame: StatusGameEnum;
    oponentName: string;
    oponentPhoto: string;
    isWin: boolean;
}

export interface GameVm { // Ответ по игре.
    id: number;
    createdDate: string;
    participantCreater: ParticipantVm;
    participantJoined: ParticipantVm | null;
    isFreeGame: boolean;
    table: TableVm;
    status: StatusGameEnum;
    lastMoveFrom: number;
    lastMoveDate: string;
    moveTime: number;
    isPrivateGame: boolean;
    priceGame: number;
    firstStep: FirstStepEnum;
    withBot: boolean;
}

export interface TableVm { // Ответ таблицы в игре
    id: number;
    wallSize: number;
    winSize: number;
    cells: CellEnum[] | null;
}

export interface ListGamesVm { // ответ на список игр
    totalCount: number;
    take: number;
    skip: number;
    data: GameInList[];
    filter: SearchGameDto;
}

export interface ParticipantVm { // Ответ на участников в игре
    userId: number;
    first_name: string;
    last_name: string;
    photo_url: string;
    freeCoin: number;
    tonCoin: number;
}

export interface GameInList { // Ответ объекта игры на список игр
    id: number;
    createrId: number;
    createrName: string;
    createrPhotoUrl: string | null;
    isFree: boolean;
    price: number;
    sizeTable: number;
    winSize: number;
    firstStep: FirstStepEnum;
}

export enum SSEStatusEnum { // Енамка SSE статусов
    Nothing = 0,
    Joined = 1,
    Move = 2,
    Over = 3,
}

export interface UserVm {  // Ответ на запросы по юзеру
    id: number | null;
    first_name: string | null;
    last_name: string | null;
    username: string | null;
    language_code: string | null;
    is_premium: boolean | null;
    added_to_attachment_menu: boolean | null;
    allows_write_to_pm: boolean | null;
    photo_url: string | null;
    freeCoin: number | null;
    tonCoin: number | null;
    lastGiftRecevied: string | null;
}

export interface BalanceVm{
    freeCoin: number;
    tonCoin: number;
}

export enum CellEnum { // ячейки таблицы в игре
    None = 0,
    Tic = 1,
    Tac = 2
}

export enum FirstStepEnum {// чей первый ход енамка
    Random = 0,
    Creater = 1,
    Joiner = 2
}

export interface SSEVm{
    status: SSEStatusEnum;
    data: any;
}

export const DEFAULT_BONUS = 20;
export const START_BONUS = 100;
export const BONUS_PERIOD_MINUTES = 60;
