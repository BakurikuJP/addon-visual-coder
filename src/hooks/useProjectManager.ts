import { useState, useEffect } from 'react';
import { Project } from '../types/project';

export function useProjectManager() {
  const [projects, setProjects] = useState<Project[]>([]);

  // TODO: 将来的にはここでデータベースとの接続を初期化
  // - Firebase Realtime Database
  // - ユーザー認証との連携
  // - プロジェクトの共有機能
  useEffect(() => {
    // TODO: データベースからプロジェクト一覧を取得
    const savedProjects = localStorage.getItem('projects');
    if (savedProjects) {
      setProjects(JSON.parse(savedProjects));
    }
  }, []);

  const saveProject = (project: Project) => {
    // TODO: データベースにプロジェクトを保存
    // - プロジェクトのバージョン管理
    // - 自動保存機能
    // - 変更履歴の管理
    const newProject = {
      ...project,
      id: Date.now().toString(),
    };

    const updatedProjects = [...projects, newProject];
    setProjects(updatedProjects);
    localStorage.setItem('projects', JSON.stringify(updatedProjects));
  };

  const loadProject = (project: Project) => {
    // TODO: データベースからプロジェクトを読み込み
    // - プロジェクトの読み込み履歴
    // - プロジェクトのプレビュー
    // - プロジェクトのインポート/エクスポート
    return project;
  };

  const deleteProject = (projectId: string) => {
    // TODO: データベースからプロジェクトを削除
    // - 削除の確認ダイアログ
    // - ゴミ箱機能
    // - 一括削除機能
    const updatedProjects = projects.filter(p => p.id !== projectId);
    setProjects(updatedProjects);
    localStorage.setItem('projects', JSON.stringify(updatedProjects));
  };

  return {
    projects,
    saveProject,
    loadProject,
    deleteProject,
  };
} 