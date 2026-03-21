"use client";
import React from "react";

interface Props { children: React.ReactNode; fallback?: React.ReactNode; }
interface State { hasError: boolean; error?: Error; }

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) { super(props); this.state = { hasError: false }; }
  static getDerivedStateFromError(error: Error): State { return { hasError: true, error }; }
  render() {
    if (this.state.hasError) return this.props.fallback ?? (
      <div style={{padding:'16px',background:'#111823',border:'1px solid rgba(174,48,50,0.3)',borderRadius:'0.125rem'}}>
        <p style={{fontFamily:'Space Grotesk',fontSize:'10px',textTransform:'uppercase',letterSpacing:'0.1em',color:'#ae3032',marginBottom:'4px'}}>Panel Error</p>
        <p style={{fontFamily:'Work Sans',fontSize:'12px',color:'#807665'}}>{this.state.error?.message ?? 'Something went wrong'}</p>
      </div>
    );
    return this.props.children;
  }
}