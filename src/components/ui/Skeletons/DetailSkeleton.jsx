import './styles.css';

const DetailSkeleton = () => {
    return (
        <div className="detail-skeleton">
            {/* Types */}
            <div className="skeleton-types">
                <div className="skeleton-pill skeleton-pulse"></div>
                <div className="skeleton-pill skeleton-pulse"></div>
            </div>

            {/* About Section */}
            <div style={{ marginTop: '24px' }}>
                <div className="skeleton-section-title skeleton-pulse"></div>
                <div className="skeleton-about-grid">
                    <div className="skeleton-about-item">
                        <div className="skeleton-value skeleton-pulse"></div>
                        <div className="skeleton-label skeleton-pulse"></div>
                    </div>
                    <div className="skeleton-about-item">
                        <div className="skeleton-value skeleton-pulse"></div>
                        <div className="skeleton-label skeleton-pulse"></div>
                    </div>
                    <div className="skeleton-about-item">
                        <div className="skeleton-value skeleton-pulse"></div>
                        <div className="skeleton-label skeleton-pulse"></div>
                    </div>
                </div>
                <div className="skeleton-desc skeleton-pulse" style={{ marginTop: '16px' }}></div>
                <div className="skeleton-desc skeleton-pulse"></div>
            </div>

            {/* Stats Section */}
            <div style={{ marginTop: '32px' }}>
                <div className="skeleton-section-title skeleton-pulse"></div>
                <div className="skeleton-stats">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="skeleton-stat-row">
                            <div className="skeleton-stat-label skeleton-pulse"></div>
                            <div className="skeleton-stat-val skeleton-pulse"></div>
                            <div className="skeleton-stat-bar skeleton-pulse"></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DetailSkeleton;
