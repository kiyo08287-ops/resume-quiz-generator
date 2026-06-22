import styled from 'styled-components'

// 結果表示部分のテーブル
export const ResultTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  margin-bottom: 20px;

  th, td {
    border: 1px solid #dee2e6;
    padding: 12px;
    text-align: left;
  }
    
  th {
    background-color: #f8f9fa;
    font-weight: bold;
  }
`

// 結果画面用のボタン
export const ResultButton = styled.button`
  padding: 10px 20px;
  margin: 10px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  background-color: #ffffff;
  color: #595959;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  transition: all 0.3s;

  &:hover {
    background-color: #f5f5f5;
  }
`