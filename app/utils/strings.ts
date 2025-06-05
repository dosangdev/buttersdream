/**
 * 지갑 주소를 포맷팅하는 함수
 * @param address 지갑 주소
 * @returns 포맷팅된 지갑 주소 (예: 0x1234...5678)
 */
export const formatAddress = (address?: string): string => {
  if (!address) return "";
  return `${address.slice(0, 4)}...${address.slice(-4)}`;
};
