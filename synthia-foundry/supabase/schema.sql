
CREATE TABLE user_anchors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id),
  birth_timestamp TIMESTAMPTZ NOT NULL,
  coordinates JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE knowledge_chunks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id),
  content TEXT NOT NULL,
  axis_resonance FLOAT8,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE foundry_assets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  asset_name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  manifest JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
