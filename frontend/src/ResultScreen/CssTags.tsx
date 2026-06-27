import styled from 'styled-components'

export const ResultTitle = styled.h3`
  color: #333;
  font-size: 22px;
  margin-bottom: 8px;
`

export const ResultStatus = styled.h5`
  color: #007bff;
  font-size: 16px;
  margin-bottom:0 0 20px 0;

  span {
    font-size: 24px;
    font-weight: bold;
  }
`

// 結果表示部分のテーブル
export const ResultTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  margin-top: 25px;
  margin-bottom: 30px;
  border: 1px solid #e9ecef;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04);

  th, td {
    padding: 16px;
    text-align: left;
    border-bottom: 1px solid #e9ecef;
  }
    
  th {
    background-color: #f8f9fa;
    color: #495057;
    font-weight: bold;
    font-size: 14px;
    letter-spacing: 0.5px;
  }

  td {
    color: #333333;
    font-size: 15px;
    line-height: 1.5;
  }

  tr:last-child td {
    border-bottom: none;
  }

  tbody tr:nth-child(even) {
    background-color: #fcfcfc;
  }
`

// ○×の結果テキストを彩るための専用コンポーネント
interface StatusTextProps {
  isCorrect: boolean;
}
export const StatusText = styled.span<StatusTextProps>`
  font-weight: bold;
  font-size: 18px;
  display: inline-block;
  padding: 2px 10px;
  border-radius: 20px;
  background-color: ${(props) => props.isCorrect ? '#e6ffed' : '#fff1f0'};
  color: ${(props) => props.isCorrect ? '#28a745' : '#dc3545'};
`

// 結果画面用のボタン
export const ResultButton = styled.button`
  padding: 14px 28px;
  margin: 10px;
  font-size: 15px;
  font-weight: bold;
  cursor: pointer;
  border-radius: 30px;
  transition: all 0.2s ease;
  display: inline-block;
  background-color: #ffffff;
  color: #495057;
  border: 1px solid #ced4da;
  box-shadow: 0 2px 4px rgba(0,0,0,0.02);

  &:hover {
    background-color: #f8f9fa;
    color: #212529;
    border-color: #007bff;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(1px);
  }
`

export const ButtonArea = styled.div`
  text-align: center;
  margin-top: 20px;
`