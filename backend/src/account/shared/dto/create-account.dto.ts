export class CreateAccountDto {
  readonly accountName: string;
  readonly balance: number;
  readonly availableBalance: number;
  readonly category: string;
  readonly tags: string;
}
